import { Interception } from "cypress/types/net-stubbing";
import { Features, AccountFeature } from "../features/FeaturesTypes";

export class FeatureUtil{

    public static featureUrl = '/v1/feature/accounts';
    private __acountsFeatures: AccountFeature[];
    private __client: string;

    constructor(client?: string){
        this.client = client;
    }

    set client(client: string){
        this.__client = client;
    }

    static intercept(): FeatureUtil{
        cy.intercept('GET', this.featureUrl).as('accountsFeatures');
        return new FeatureUtil();
    }

    private getAccountFeatures(account: string): Features[]{
        const match: AccountFeature = this.__acountsFeatures.filter(($account: AccountFeature) => $account.accountName.toLowerCase() == account.toLowerCase() )[0];
        return match ? match.features : [];
    }
    
    private getFeature(feature: string): Features{
        const features: Features[] = this.getAccountFeatures(this.__client);
        const searchFeature: Features = features.filter((feat: Features) => feat.featureName === feature)[0];
        return searchFeature;
    }

    private isFeatureOn(feature: string): boolean{
        let result = false;
        const feat: Features = this.getFeature(feature);
        if(feat && feat.applicable){
            result = true
        }
        return result
    }
    
    getEnabledFeatures(account: string): Cypress.Chainable<Features[]>{
        return cy.wait('@accountsFeatures')
            .then(($response: Interception)=>{
                const features: AccountFeature = $response.response.body.filter((AccountFeature: AccountFeature) => AccountFeature.accountName.toLowerCase() === account.toLowerCase())[0];
                return cy.wrap(features.features || []);
            });
    }

    isFeatureAvailable(feature: string, client?: string): Cypress.Chainable {
        if(client){ this.client = client; }
        if(!this.__acountsFeatures){
            return cy.wait('@accountsFeatures')
                .then(($response: Interception)=>{
                    this.__acountsFeatures = $response.response.body;
                    cy.wrap(this.isFeatureOn(feature)).as('isFeatureOn');
                });
        }else{
            return cy.wrap(this.isFeatureOn(feature)).as('isFeatureOn');
        }
    }

}