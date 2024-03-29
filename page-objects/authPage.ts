import {Locator, Page, expect} from "@playwright/test";

export class AuthPage {

    readonly page: Page
    readonly emailInput: Locator
    readonly passwordInput: Locator
    readonly logInButton: Locator
    readonly notificationMessage: Locator

    constructor(page: Page){
        this.page = page
        this.emailInput = page.getByPlaceholder(`Email`)
        this.passwordInput = page.getByPlaceholder(`Enter password`)
        this.logInButton = page.getByRole('button', { name: /Login/i })
        this.notificationMessage = page.locator(`.noty_text`)
    }

    async fillEmailInput(email: string){
        await this.emailInput.fill(email)
    }

    async fillPasswordInput(password: string){
        await this.passwordInput.fill(password)
    }

    async checkPasswordInputEqualsTo(password: string){
        let passwordValue = await this.passwordInput.inputValue()
        expect(passwordValue).toEqual(password)
    }

    async clickLoginButton(){
        await this.logInButton.click()
    }

    async getErrorWithText(errorText: string){
        return this.page.getByText(errorText)
    }

    async getNotificationMessage(){
        return this.notificationMessage
    }

    async loginWithCredentials(email: string, password: string){
        await this.fillEmailInput(email)
        await this.fillPasswordInput(password)
        await this.checkPasswordInputEqualsTo(password)
        await this.clickLoginButton()
    }
}