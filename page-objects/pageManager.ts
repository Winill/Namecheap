import {Page} from "@playwright/test";
import { MainPage } from '../page-objects/mainPage';
import { AuthPage } from '../page-objects/authPage';
import { ProfilePage } from "./profilePage";

export class PageManager {

    private readonly page: Page
    private readonly mainPage: MainPage
    private readonly authPage: AuthPage
    private readonly profilePage: ProfilePage

    constructor(page: Page){
        this.page = page
        this.mainPage = new MainPage(this.page)
        this.authPage = new AuthPage(this.page)
        this.profilePage = new ProfilePage(this.page)
    }

    onMainPage(){
        return this.mainPage;
    }

    onAuthPage(){
        return this.authPage;
    }

    onProfilePage(){
        return this.profilePage;
    }
    
}