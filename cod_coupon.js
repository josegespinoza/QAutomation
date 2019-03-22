const { openBrowser, goto, press, write, $, click, text, inputField, into, clear, intervalSecs, waitFor, screenshot, closeBrowser, intercept, contains, textField } = require('taiko');
var w = ""
//beforeScenario(async() => await openBrowser({headless: false, args:['--window-size=768,1024']}));
beforeScenario(async() => await openBrowser({headless: false}));

gauge.screenshotFn = async function () {
    return await screenshot({encoding: "base64"});
};

step("Go to Linio website <website>", async(website) => {
    await goto(website);
    w = website;
});

step("Find the product <sku>", async(sku) => {
    await write(sku);
    await press('Enter',{timeout:5000});
});

step("Add the product to the cart", async () => {
    await click('AÑADIR AL CARRITO');
    await click('IR AL CARRITO');
});

step("Go to the cart and use the coupon <coupon>", async(coupon) => {
    await text('Mouse Xtech Óptico Usb 3 Botones Ergonómicos 800dpi',{timeout:10000}).exists();
    await click('Aplicar cupón',{timeout:10000});
    await write(coupon, into(textField({placeholder: "Ingresa el código"})))
    await click('Aplicar');
    await click('PROCESAR COMPRA',{timeout:10000});
});

step("Login into Linio-website using as username <user> and password <pass>", async(user,pass) =>{
    await goto(w+'account/login')
    await write(user, into($('#login_form_email')));
    await write(pass, into($('#login_form_password')));
    await click('INICIAR SESIÓN SEGURA');
    await goto(w,{timeout:5000});
});

step("Go to checkout and process the payment", async() => {
    await click('Pago en efectivo al recibir');
    await click('GUARDAR Y CONTINUAR');
});

step("Get order number in the success page.", async() => {
    await click('FINALIZAR COMPRA');
        var pedido = await $('.order-title').text();
    console.log(pedido);
});