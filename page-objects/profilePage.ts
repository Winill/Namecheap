import {Locator, Page} from "@playwright/test";

export class ProfilePage {

    readonly page: Page
    readonly nameField: Locator
    readonly emailField: Locator
    readonly phoneField: Locator
    readonly addressField: Locator
    readonly supportPinField: Locator
    readonly newsletterStatus: Locator

    constructor(page: Page){
        this.page = page
        this.nameField = page.locator('span[ng-hide="activeRow === \'name\'"]')
        this.emailField = page.locator('span[ng-hide="activeRow === \'email\'"]')
        this.phoneField = page.locator('span[ng-hide="activeRow === \'phone\'"]')
        this.addressField = page.locator('span[ng-hide="activeRow === \'address\'"]')
        this.supportPinField = page.locator('[ng-class="{disabled: activeRow !== \'pin\' && activeRow !== \'all\'}"] .ng-binding')
        this.newsletterStatus = page.getByPlaceholder(`Enter password`)
    }

    async getTextFromNameField(){
        return await this.nameField.innerText()
    }

    async getTextFromEmailField(){
        return await this.emailField.innerText()
    }

    async getTextFromPhoneField(){
        return await this.phoneField.innerText()
    }

    async getTextFromAddressField(){
        return await this.addressField.innerText()
    }

    async getSupportPin(){
        return await this.supportPinField.innerText()
    }

    async getNewsletterStatus(){
        return await this.newsletterStatus.isVisible()
    }

    async constructProfileData(){
        return {   name: await this.getTextFromNameField(),
            email: await this.getTextFromEmailField(),
            phone: await this.getTextFromPhoneField(),
            address: await this.getTextFromAddressField(),
            supportPin: await this.getSupportPin(),
            newsLettreStatus: await this.getNewsletterStatus()
        }
    }

}