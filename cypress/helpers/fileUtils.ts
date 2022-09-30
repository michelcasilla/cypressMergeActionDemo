/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as path from 'path';

export const deleteDownloadsFolder = () => {
    const downloadsFolder = Cypress.config('downloadsFolder')
    cy.task('deleteFolder', downloadsFolder)
}

export const parseXlsx = (filePath: string) => {
    const downloadsFolder = Cypress.config('downloadsFolder')

    return cy.task('parseXlsx', path.join(downloadsFolder, filePath))
}