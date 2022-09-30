export type Features = {
    accountFeatureID: string;
    applicable: string;
    featureID: string;
    featureName: string;
}

export type AccountFeature = {
    accountID: string;
    accountName: string;
    clientID: string;
    features: Features[];
    logoURL: string;
    salesforceID: string;
    shortName: string;
}