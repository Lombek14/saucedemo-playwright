import { request } from '@playwright/test';
import { test, expect } from '../fixtures/hybridTest';

test.describe('@api Mahovastore hybrid API + UI tests', () => {

  // ------------------ TEST 1 ------------------
  test('Hybrid 1: use apiUser fixture to drive Mahovastore UI + subtotal', async ({ apiUser, page }) => {
    const firstName = apiUser.first_name;
    const lastName = apiUser.last_name;
    const email = apiUser.email;

    // ---- UI side on Mahovastore ----Homepage
    await page.goto('https://mahovastore.com', { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveTitle(/Mahovastore/i);

    // open search popup
    await page.getByRole('button', { name: /Search/i }).click();

    const searchInput = page.getByRole('searchbox', { name: 'Search products' });
    const clickSearchBtn = page.getByRole('button', { name: 'Submit' });

    await expect(searchInput).toBeVisible();

    //fill first name is coming from API data
    await searchInput.fill(firstName);
    await expect(searchInput).toHaveValue(firstName);
    await clickSearchBtn.click();

    // expected zero result for "Janet"
    await page.waitForLoadState('domcontentloaded');
    const results = page.getByRole('heading', { name: 'Found 0 results for "Janet"' });
    await expect(results).toBeVisible();

    //search again a valid product with "car" on the same searchbox
    const InputBox = page.getByRole('textbox', { name: 'Search products' });
    await expect(InputBox).toBeVisible();

    await InputBox.click();
    await InputBox.fill('car');
    await expect(InputBox).toHaveValue('car');
    await clickSearchBtn.click();

    await page.waitForLoadState('domcontentloaded');

    const carResultsList = page.getByRole('heading', { name: /Found \d+ results for "car"/i });
    await expect(carResultsList).toBeVisible();

    // choose a product from product list
    await page.getByLabel('Car Cleaning Set - Leather').click();

    const image = page.getByRole('img', { name: 'Car Leather Cleaner Set -' }).nth(1);
    const imgDesc = page.getByRole('heading', { name: 'Car Cleaning Set - Leather' });

    await expect(image).toBeVisible();
    await expect(imgDesc).toBeVisible();

    await page.getByRole('button', { name: 'Add to cart' }).click()
    await page.waitForLoadState('domcontentloaded');

    const shoppingCartPage = page.getByRole('heading', { name: /Shopping Cart/i });
    const viewCartBtn = page.getByRole('link', { name: /View Cart/i });

    await expect(shoppingCartPage).toBeVisible();
    await expect(viewCartBtn).toBeVisible();
    await viewCartBtn.click();

    // now on - cart page
    await page.waitForLoadState('domcontentloaded');
    await expect(shoppingCartPage).toBeVisible();

    //----Validate the shopping cart, the quantity of the cart badge and subtotal---

    // cart page subtotal
    const cartSubtotalAmount = page
      .locator('#MinimogCartFooter')
      .getByText(/Subtotal/i)
      .locator('+ *');

    const cartSubtotalText = (await cartSubtotalAmount.innerText()).trim();
    console.log('Cart subtotal:', cartSubtotalText);


    // other cart check
    const cartBadge = page.getByRole('link', { name: '1' });
    const checkoutBtn = page.getByRole('button', { name: /CHECK OUT/i });


    await expect(cartBadge).toHaveText(/\d+/);
    await expect(cartSubtotalAmount).toBeVisible();
    await expect(checkoutBtn).toBeVisible();

    // got to checkout
    await checkoutBtn.click();

    // checkout page subtotal 
    const checkoutSubtotalAmount = page
      .getByRole('row', { name: /Subtotal \$/i })
      .getByText(/\$\d+\.\d{2}/);

    const checkoutSubtotalText = (await checkoutSubtotalAmount.innerText()).trim();
    console.log('Checkout subtotal:', checkoutSubtotalText);

    // compare the two subtotal
    await expect(checkoutSubtotalAmount).toHaveText(cartSubtotalText);

    // fill contact email and first/last name using API data to Delivery address
    const expressCheckout = page.getByRole('heading', { name: /Express checkout/i });
    const contact = page.getByRole('heading', { name: /Contact/i });
    const delivery = page.getByRole('heading', { name: /Delivery/i });

    await expect(expressCheckout).toBeVisible();
    await expect(contact).toBeVisible();


    const contactEmail = page.getByRole('textbox', { name: 'Email or mobile phone number' });
    const firstNameInput = page.getByRole('textbox', { name: 'First name' });
    const lastNameInput = page.getByRole('textbox', { name: 'Last name' });

    await contactEmail.click();
    await contactEmail.fill(email);
    await expect(contactEmail).toHaveValue('janet.weaver@reqres.in');

    await expect(delivery).toBeVisible();
    await expect(firstNameInput).toBeVisible();

    await firstNameInput.click();
    await firstNameInput.fill(firstName);
    await expect(firstNameInput).toHaveValue('Janet');

    await expect(lastNameInput).toBeVisible();
    await lastNameInput.click();
    await lastNameInput.fill(lastName);
    await expect(lastNameInput).toHaveValue('Weaver');

  });

  // ------------------ TEST 2 ------------------
  test('Hybrid 2: UI email -> API create user -> assert id', async ({ apiUser, page, request }) => {
    const firstName = apiUser.first_name;
    const lastName = apiUser.last_name;
    const email = apiUser.email;

    // ---- UI side on Mahovastore ----Homepage
    await page.goto('https://mahovastore.com', { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveTitle(/Mahovastore/i);

    // open search popup and search "car"
    await page.getByRole('button', { name: /Search/i }).click();

    const searchInput = page.getByRole('searchbox', { name: 'Search products' });
    const clickSearchBtn = page.getByRole('button', { name: 'Submit' });

    await searchInput.click();
    await searchInput.fill('car'); 
    await expect(searchInput).toHaveValue('car');

    await clickSearchBtn.click();
    await page.waitForLoadState('domcontentloaded');

    const carResultsList = page.getByRole('heading', { name: /Found \d+ results for "car"/i });
    await expect(carResultsList).toBeVisible();

    // choose a product from product list
    await page.getByLabel('Car Cleaning Set - Leather').click();

    const image = page.getByRole('img', { name: 'Car Leather Cleaner Set -' }).nth(1);
    const imgDesc = page.getByRole('heading', { name: 'Car Cleaning Set - Leather' });

    await expect(image).toBeVisible();
    await expect(imgDesc).toBeVisible();

    await page.getByRole('button', { name: 'Add to cart' }).click()
    await page.waitForLoadState('domcontentloaded');

    const shoppingCartPage = page.getByRole('heading', { name: /Shopping Cart/i });
    const viewCartBtn = page.getByRole('link', { name: /View Cart/i });

    await expect(shoppingCartPage).toBeVisible();
    await expect(viewCartBtn).toBeVisible();
    await viewCartBtn.click();

    // now on - cart page
    await page.waitForLoadState('domcontentloaded');
    await expect(shoppingCartPage).toBeVisible();

    const cartBadge = page.getByRole('link', { name: '1' });
    const checkoutBtn = page.getByRole('button', { name: /CHECK OUT/i });

    await expect(cartBadge).toHaveText(/\d+/);
    await expect(checkoutBtn).toBeVisible();

    // got to checkout
    await checkoutBtn.click();
    await page.waitForLoadState('domcontentloaded');

    // fill contact email and first/last name using API data to Delivery address
    const expressCheckout = page.getByRole('heading', { name: /Express checkout/i });
    const contact = page.getByRole('heading', { name: /Contact/i });
    const delivery = page.getByRole('heading', { name: /Delivery/i });

    await expect(expressCheckout).toBeVisible();
    await expect(contact).toBeVisible();


    const contactEmail = page.getByRole('textbox', { name: 'Email or mobile phone number' });
    const firstNameInput = page.getByRole('textbox', { name: 'First name' });
    const lastNameInput = page.getByRole('textbox', { name: 'Last name' });

    await contactEmail.click();
    await contactEmail.fill(email);
    await expect(contactEmail).toHaveValue('janet.weaver@reqres.in');

    await expect(delivery).toBeVisible();
    await expect(firstNameInput).toBeVisible();

    await firstNameInput.click();
    await firstNameInput.fill(firstName);
    await expect(firstNameInput).toHaveValue('Janet');

    await expect(lastNameInput).toBeVisible();
    await lastNameInput.click();
    await lastNameInput.fill(lastName);
    await expect(lastNameInput).toHaveValue('Weaver');

   // UI -> API: grab email from UI and send to Reqres
    const emailValue = await contactEmail.inputValue();
    console.log('Email taken from checkout UI:', emailValue);

    const response = await request.post('https://reqres.in/api/users', {
      headers: { 'x-api-key': 'reqres-free-v1'},
      data: {
        email: emailValue,
        name: `${firstName} ${lastName}`
      },
    });

    await expect(response).toBeOK();
    const body = await response.json();
    console.log('Reqres create user response:', body);


    // validate API returned an id(round-trip complete)
    expect(body.id).toBeTruthy();


    // return to cart(without placing order)
    const returnToCart = page.getByRole('link', { name: 'Cart' });
    await expect(returnToCart).toBeVisible();
    await returnToCart.click();

    await page.waitForLoadState('domcontentloaded');

    const product = page.getByText('Product', { exact: true });
    await expect(product).toBeVisible();

    // remove item from cart
    const removeProduct = page.getByText(/Remove/i);
    await expect(removeProduct).toBeVisible();
    await removeProduct.click();

    await page.waitForLoadState('domcontentloaded');

    // validate empty cart
    const emptyCartText = page.getByRole('heading', { name: 'Your cart is currently empty' });
    await expect(emptyCartText).toBeVisible();

    // click "BACK TO SHOPPING"
    const backToShopping = page.getByRole('link', { name: /Back to shopping/i })
    await expect(backToShopping).toBeVisible();
    await backToShopping.click();

    await page.waitForLoadState('domcontentloaded');
    await expect(page).toHaveURL('https://mahovastore.com/collections/all');


  });


});
