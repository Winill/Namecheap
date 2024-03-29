import {Locator, Page, expect} from "@playwright/test";
import { HelperBase } from "./helperBase";

export class MainPage{

    readonly page: Page
    readonly logInButton: Locator
    readonly userDropDownMenuButton: Locator
    readonly logOutButton: Locator
    readonly profileButton: Locator

    constructor(page: Page){
        this.page = page
        this.logInButton = page.getByText(`Log in`)
        this.userDropDownMenuButton = page.locator(`.ssls-header-user > .ssls-header-btn`)
        this.logOutButton = page.getByText(` Log out`)
        this.profileButton = page.getByText(`Profile`)
    }

    async clickLogIn(){
        await this.logInButton.click()
        await expect(this.page).toHaveURL(`https://www.sbzend.ssls.com/authorize`)
    }

    async openUserDropDownMenu(){
        await this.userDropDownMenuButton.click()
    }

    async clickLogOut(){
        await this.logOutButton.click()
    }

    async openProfilePage(){
        await this.profileButton.click()
    }

    async getUserLogInButtonValue(){
        return this.page.locator(`.ssls-header-user .ssls-toolbar__btn-text`)
    }

    async getDropDownMenu(){
        return this.page.locator(`.ssls-header-user .ssls-dropdown__holder`)
    }
}