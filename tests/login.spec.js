const {test, expect} = require('@playwright/test')

test ('Able to loin' , async({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://the-internet.herokuapp.com/login');
    //await page.waitforloadstate();
    console.log(await page.title());
    await page.getByLabel('username').fill('tomsmith');
    await page.getByLabel('password').fill('SuperSecretPassword!');
    await page.getByRole('button', { name: /Login/i }).click();
    await page.pause();
    await page.screenshot();
    console.log(await page.locator('#flash').textContent());
    await expect (page.locator('#flash')).toContainText("You logged into a secure area!");
    await page.locator('.button').click();
    await expect(page.locator('#flash')).toContainText("You logged out of the secure area!");
    console.log(await page.locator('#flash').textContent());
    //await expect(page.locator('.example h2').toBeVisible());
    
    
} );

test ('Incorrect password do not allow to loin', async({page}) =>
{
    //const context = await browser.newContext();
    //const page = await context.newPage();
    await page.goto('https://the-internet.herokuapp.com/login');
    //await page.waitforloadstate();
    await expect (page).toHaveTitle("The Internet");
    await page.getByLabel('username').fill('tomsmith');
    await page.getByLabel('password').fill('SuperSecretPassword!2');
    await page.getByRole('button', { name: /Login/i }).click();
    console.log(await page.locator('#flash').textContent());
    await expect (page.locator('#flash')).toContainText("Your password is invalid!");
    

});

test ('Incorrect username do not allow to loin', async({page}) =>
{
    //const context = await browser.newContext();
    //const page = await context.newPage();
    await page.goto('https://the-internet.herokuapp.com/login');
    //await page.waitforloadstate();
    await expect (page).toHaveTitle("The Internet");
    await page.getByLabel('username').fill('tomsmith1');
    await page.getByLabel('password').fill('SuperSecretPassword!');
    await page.getByRole('button', { name: /Login/i }).click();
    console.log(await page.locator('#flash').textContent());
    await expect (page.locator('#flash')).toContainText("Your username is invalid!");
    

});