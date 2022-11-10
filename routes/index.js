const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController')();
const ContactController = require('../controllers/ContactController')();

async function isUserAllowed(req, res, next) {
    if (req.session.user) {
        res.locals = {...res.locals, user: req.session.user};
    } else {
        res.locals = {...res.locals, user: null};
    }
    return next();
}

router.get('/', isUserAllowed, function (req, res, next) {
    res.locals = {
        ...res.locals,
        title: 'Home'
    };
    res.render('index');
});

router.get('/products', isUserAllowed, function (req, res, next) {
    res.locals = {
        ...res.locals,
        title: 'Products'
    };
    res.render('products');
});

router.get('/product-details', isUserAllowed, function (req, res, next) {
    res.locals = {
        ...res.locals,
        title: 'Product Detail'
    };
    res.render('product-details');
});

router.get('/checkout', isUserAllowed, function (req, res, next) {
    res.locals = {
        ...res.locals,
        title: 'Checkout'
    };
    res.render('checkout');
});

router.get('/contact', isUserAllowed, function (req, res, next) {
    res.locals = {
        ...res.locals,
        title: 'Contact'
    };
    res.render('contact');
});

router.get('/about-us', isUserAllowed, function (req, res, next) {
    res.locals = {
        ...res.locals,
        title: 'About Us'
    };
    res.render('about-us');
});

router.get('/team', isUserAllowed, function (req, res, next) {
    res.locals = {
        ...res.locals,
        title: 'Team'
    };
    res.render('team');
});

router.get('/blog', isUserAllowed, function (req, res, next) {
    res.locals = {
        ...res.locals,
        title: 'Blog'
    };
    res.render('blog');
});

router.get('/blog-details', isUserAllowed, function (req, res, next) {
    res.locals = {
        ...res.locals,
        title: 'Blog Detail'
    };
    res.render('blog-details');
});

router.get('/testimonials', isUserAllowed, function (req, res, next) {
    res.locals = {
        ...res.locals,
        title: 'Testimonials'
    };
    res.render('testimonials');
});

router.get('/terms', isUserAllowed, function (req, res, next) {
    res.locals = {
        ...res.locals,
        title: 'Terms'
    };
    res.render('terms');
});

router.get('/login', function (req, res, next) {
    res.locals = {
        ...res.locals,
        title: 'Login'
    };
    res.render('login');
});

router.get('/logout', function(req, res) {
    req.session.user = null;
    res.redirect('/');
})

router.get('/register', function (req, res, next) {
    res.locals = {
        title: 'Register'
    };
    res.render('register');
});

router.post('/login', AuthController.doLogin);
router.post('/register', AuthController.doRegister);
router.post('/contact/create', ContactController.doCreate);

module.exports = router;
