import { getAccount } from "../../../../helpers/environment";
import { UserType } from "../../interfaces/UserTypeInterfaces";

export const LoginMetadata = {
    Url: '/idp/login',
    Intercepts: {
        Info: '/idp/info',
        TosAcceptanceDate: '/v1/users/tosacceptancedate',
        AppConfig: '/v1/appconfig',
        ProjectRequests: '/v1/requests/projectrequests/*',
        HomepageRedirect: '/a-scend/'
    },
    Ui: {
        EmailAddress: '#email',
        Password: '#password',
        LoginButton: '#loginbutton',
        ForgotPasswordLink: '.forgotpasswordtext a', 
        ResetPasswordLink: '.box > :nth-child(1)',
        FormControl: '.form-control',
        ValidationAlert: 'ngb-alert',
        OpenProfileMenuInfo : 'app-dashboard-top-bar .mat-menu-trigger',
        ProfileNameLabel: 'CAPTION.user-nav-header--name',
        AppUserOptions : 'app-user-options'
    },
}

export class LoginService {
    private _email: string;
    private _password: string;
    private _isLoggedIn: boolean;
    private _profileName: string;

    get email(): string {
        return this._email;
    }
    set email(email: string) {
        this._email = email;

        cy.typeInField(LoginMetadata.Ui.EmailAddress, email);
    }

    get password(): string {
        return this._password;
    }
    set password(password: string) {
        this._password = password;

        cy.typeInField(LoginMetadata.Ui.Password, password);
    }

    get isLoggedIn(): boolean {        
        return this._isLoggedIn;
    }

    get loginButton(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get(LoginMetadata.Ui.LoginButton);
    }

    get profileName(): string {
        return this._profileName;
    }

    static visit(): LoginService {
        const returnObject = new LoginService();

        cy.loginIntercept();

        return returnObject;
    }

    login(email?: string, password?: string): LoginService {
        if (email) { this._email = email }
        if (password) { this._password = password }

        if (!this._email || !this._password) {
            throw Error("You must set an email and a password before calling .login");
        }

        cy.login(this._email, this._password, true);
        this.onLogin();

        return this;
    }

    loginAsRole(role: string): LoginService {
        const { username, password }: UserType = getAccount(role);

        if (!username || !password) {
            throw new Error(`No account found for user type: ${role}`);
        }
        
        return this.login(username, password);
    }

    /**
     * Validates that an error message is displayed on the page, and (optionally) that the error message text matches the provided text.
     * @param errorMessage Optional parameter, that if supplied will validate that the error message provided is the one that is displayed.
     * @returns boolean indicating if the error message is displayed.
     */
     hasErrorMessage(callback: (message: string) => void): void {
        cy.get(LoginMetadata.Ui.ValidationAlert).then($element => {
            // return !errorMessage || (errorMessage && $element.text() == errorMessage);
            callback($element.text());
        });

        // return false;
    }

    /**
     * Invokes the "send password" feature in the login page.
     * @param email The email address to use when sending the forgot password email.
     * @returns An instance of the page after the forgot password button is clicked.
     */
    sendForgotPassword(email: string): LoginService {
        //TODO: implement this.
        return this;
    }
    
    waitForResponse(): LoginService {
        cy.finishedLoading();
        this.hasErrorMessage((msg: string)=>{
            if(!msg){
                cy.acceptTermsOfUse();
                this.onLogin();
            }
        })
        return this;
    }

    private onLogin(): void {
        cy.get(LoginMetadata.Ui.OpenProfileMenuInfo).click({force : true});
        cy.get(LoginMetadata.Ui.ProfileNameLabel).invoke("text").then($label => {
            this._isLoggedIn = $label !== null;
            this._profileName = $label?.substring(0, $label?.length - 1);
        });        
    }
}