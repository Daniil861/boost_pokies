(() => {
    "use strict";
    function isWebp() {
        function testWebP(callback) {
            let webP = new Image;
            webP.onload = webP.onerror = function() {
                callback(2 == webP.height);
            };
            webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
        }
        testWebP((function(support) {
            let className = true === support ? "webp" : "no-webp";
            document.documentElement.classList.add(className);
        }));
    }
    function addLoadedClass() {
        window.addEventListener("load", (function() {
            if (document.querySelector("body")) setTimeout((function() {
                document.querySelector("body").classList.add("_loaded");
            }), 200);
        }));
    }
    let addWindowScrollEvent = false;
    setTimeout((() => {
        if (addWindowScrollEvent) {
            let windowScroll = new Event("windowScroll");
            window.addEventListener("scroll", (function(e) {
                document.dispatchEvent(windowScroll);
            }));
        }
    }), 0);
    if (sessionStorage.getItem("preloader")) {
        if (document.querySelector(".preloader")) document.querySelector(".preloader").classList.add("_hide");
        document.querySelector(".wrapper").classList.add("_visible");
    }
    if (sessionStorage.getItem("money")) {
        if (document.querySelector(".check")) document.querySelectorAll(".check").forEach((el => {
            el.textContent = sessionStorage.getItem("money");
        }));
    } else {
        sessionStorage.setItem("money", 1e3);
        if (document.querySelector(".check")) document.querySelectorAll(".check").forEach((el => {
            el.textContent = sessionStorage.getItem("money");
        }));
    }
    if (document.querySelector(".game")) if (+sessionStorage.getItem("money") >= 50) {
        document.querySelector(".block-bet__coins").textContent = 50;
        sessionStorage.setItem("current-bet", 50);
    } else {
        document.querySelector(".block-bet__coins").textContent = 0;
        sessionStorage.setItem("current-bet", 0);
    }
    const preloader = document.querySelector(".preloader");
    const wrapper = document.querySelector(".wrapper");
    function remove_class(block, className) {
        document.querySelectorAll(block).forEach((el => {
            if (el.classList.contains(className)) el.classList.remove(className);
        }));
    }
    function delete_money(count, block) {
        let money = +sessionStorage.getItem("money");
        sessionStorage.setItem("money", money - count);
        setTimeout((() => {
            document.querySelectorAll(block).forEach((el => el.classList.add("_delete-money")));
            document.querySelectorAll(block).forEach((el => el.textContent = sessionStorage.getItem("money")));
        }), 500);
        setTimeout((() => {
            document.querySelectorAll(block).forEach((el => el.classList.remove("_delete-money")));
        }), 1500);
    }
    function no_money(block) {
        document.querySelectorAll(block).forEach((el => el.classList.add("_no-money")));
        setTimeout((() => {
            document.querySelectorAll(block).forEach((el => el.classList.remove("_no-money")));
        }), 1e3);
    }
    function get_random(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }
    function add_money(count, block, delay, delay_off) {
        let money = +sessionStorage.getItem("money") + count;
        setTimeout((() => {
            sessionStorage.setItem("money", money);
            document.querySelectorAll(block).forEach((el => el.textContent = sessionStorage.getItem("money")));
            document.querySelectorAll(block).forEach((el => el.classList.add("_anim-add-money")));
        }), delay);
        setTimeout((() => {
            document.querySelectorAll(block).forEach((el => el.classList.remove("_anim-add-money")));
        }), delay_off);
    }
    let anim_items = document.querySelectorAll(".icon-anim img");
    function get_random_animate() {
        let number = get_random(0, 3);
        let arr = [ "jump", "scale", "rotate" ];
        let random_item = get_random(0, anim_items.length);
        anim_items.forEach((el => {
            if (el.classList.contains("_anim-icon-jump")) el.classList.remove("_anim-icon-jump"); else if (el.classList.contains("_anim-icon-scale")) el.classList.remove("_anim-icon-scale"); else if (el.classList.contains("_anim-icon-rotate")) el.classList.remove("_anim-icon-rotate");
        }));
        setTimeout((() => {
            anim_items[random_item].classList.add(`_anim-icon-${arr[number]}`);
        }), 100);
    }
    if (document.querySelector(".icon-anim img")) setInterval((() => {
        get_random_animate();
    }), 1e4);
    if (document.querySelector(".game")) {
        check_write_protect();
        if (sessionStorage.getItem("current-thing")) write_thing(+sessionStorage.getItem("current-thing")); else {
            sessionStorage.setItem("current-thing", 2);
            write_thing(+sessionStorage.getItem("current-thing"));
        }
    }
    function check_write_protect() {
        if (sessionStorage.getItem("protect-1") > 0) {
            document.querySelector(".protects__count_1").textContent = +sessionStorage.getItem("protect-1");
            document.querySelector(".protects__item_1").classList.remove("_hold");
        } else {
            document.querySelector(".protects__item_1").classList.add("_hold");
            document.querySelector(".protects__count_1").textContent = 0;
        }
        if (sessionStorage.getItem("protect-2") > 0) {
            document.querySelector(".protects__count_2").textContent = +sessionStorage.getItem("protect-2");
            document.querySelector(".protects__item_2").classList.remove("_hold");
        } else {
            document.querySelector(".protects__item_2").classList.add("_hold");
            document.querySelector(".protects__count_2").textContent = 0;
        }
    }
    function write_thing(number) {
        document.querySelectorAll(`.shield`).forEach((el => el.classList.add("_hold")));
        document.querySelector(`.shield_${number}`).classList.remove("_hold");
    }
    function write_game_current_protect() {
        if (sessionStorage.getItem("current-protect")) {
            document.querySelector(".actions-field__protect").classList.add("_active");
            if (1 == +sessionStorage.getItem("current-protect")) document.querySelector(".actions-field__protect img").setAttribute("src", "img/icons/shield-2.png"); else if (2 == +sessionStorage.getItem("current-protect")) document.querySelector(".actions-field__protect img").setAttribute("src", "img/icons/shield-3.png");
        }
    }
    function write_game_current_bet() {
        document.querySelector(".actions-field__coin-bet").textContent = +sessionStorage.getItem("current-bet");
    }
    function write_player_select() {
        let num_player = +sessionStorage.getItem("current-thing");
        document.querySelector(".field__gif_1 img").setAttribute("src", `img/gif/player_${num_player}.gif`);
    }
    function generate_bot_select() {
        let num = get_random(1, 4);
        sessionStorage.setItem("bot-thing", num);
    }
    function write_bot_select() {
        let num = +sessionStorage.getItem("bot-thing");
        document.querySelector(".field__gif_2 img").setAttribute("src", `img/gif/enemy_${num}.gif`);
    }
    function write_game_button_result() {
        if (1 == +sessionStorage.getItem("result")) {
            document.querySelector(".field__button p").textContent = "win";
            document.querySelector(".field__button-box").classList.add("_win");
        } else if (2 == +sessionStorage.getItem("result")) {
            document.querySelector(".field__button p").textContent = "loose";
            document.querySelector(".field__button-box").classList.add("_loose");
        } else if (3 == +sessionStorage.getItem("result")) {
            document.querySelector(".field__button p").textContent = "draw";
            document.querySelector(".field__button-box").classList.add("_draw");
        }
    }
    function check_game_over() {
        let player = +sessionStorage.getItem("current-thing");
        let bot = +sessionStorage.getItem("bot-thing");
        if (1 == player && 2 == bot || 2 == player && 3 == bot || 3 == player && 1 == bot) {
            sessionStorage.setItem("result", 1);
            setTimeout((() => {
                add_money(2 * +sessionStorage.getItem("current-bet"), ".check", 1e3, 2e3);
            }), 6e3);
        } else if (2 == player && 1 == bot || 3 == player && 2 == bot || 1 == player && 3 == bot) {
            sessionStorage.setItem("result", 2);
            setTimeout((() => {
                check_use_protect();
                if (sessionStorage.getItem("current-protect")) document.querySelector(".actions-field__protect img").classList.add("_anim");
            }), 6e3);
        } else {
            sessionStorage.setItem("result", 3);
            setTimeout((() => {
                add_money(+sessionStorage.getItem("current-bet"), ".check", 1e3, 2e3);
            }), 6e3);
        }
    }
    function check_use_protect() {
        if (1 == +sessionStorage.getItem("current-protect")) add_money(+sessionStorage.getItem("current-bet") / 2, ".check", 1e3, 2e3); else if (2 == +sessionStorage.getItem("current-protect")) add_money(+sessionStorage.getItem("current-bet"), ".check", 1e3, 2e3);
    }
    function create_history_item() {
        let player_thing = +sessionStorage.getItem("current-thing");
        let bot_thing = +sessionStorage.getItem("bot-thing");
        let item = document.createElement("div");
        item.classList.add("history__item");
        let player = document.createElement("div");
        player.classList.add("history__player");
        player.classList.add("history__player_1");
        let image_pl = document.createElement("img");
        image_pl.setAttribute("src", `img/icons/thing-${player_thing}.png`);
        player.append(image_pl);
        let block = document.createElement("div");
        block.classList.add("history__middle");
        let image_bl = document.createElement("img");
        if (1 == +sessionStorage.getItem("result")) image_bl.setAttribute("src", `img/icons/btn-green.png`); else if (2 == +sessionStorage.getItem("result")) image_bl.setAttribute("src", `img/icons/btn.png`); else if (3 == +sessionStorage.getItem("result")) image_bl.setAttribute("src", `img/icons/btn-green.png`);
        block.append(image_bl);
        let bot = document.createElement("div");
        bot.classList.add("history__player");
        bot.classList.add("history__player_2");
        let image_bot = document.createElement("img");
        image_bot.setAttribute("src", `img/icons/thing-${bot_thing}.png`);
        bot.append(image_bot);
        item.append(player, block, bot);
        document.querySelector(".history__library").prepend(item);
    }
    function remove_protect_storrage() {
        if (sessionStorage.getItem("current-protect")) if (1 == +sessionStorage.getItem("current-protect")) sessionStorage.setItem("protect-1", +sessionStorage.getItem("protect-1") - 1); else if (2 == +sessionStorage.getItem("current-protect")) sessionStorage.setItem("protect-2", +sessionStorage.getItem("protect-2") - 1);
        check_write_protect();
    }
    function start_game() {
        generate_bot_select();
        write_game_current_protect();
        write_game_current_bet();
        write_player_select();
        write_bot_select();
        check_game_over();
        write_game_button_result();
        delete_money(+sessionStorage.getItem("current-bet"), ".check");
        remove_protect_storrage();
        setTimeout((() => {
            document.querySelector(".field__button-box").classList.add("_active");
            create_history_item();
        }), 6e3);
    }
    function reset_game() {
        document.querySelector(".actions-field__protect").classList.remove("_active");
        document.querySelectorAll(".field__heroe").forEach((el => el.classList.remove("_active")));
        document.querySelector(".field__button-box").classList.remove("_active");
        document.querySelectorAll(".protects__item").forEach((el => el.classList.remove("_selected")));
        if (document.querySelector(".field__button-box").classList.contains("_win")) document.querySelector(".field__button-box").classList.remove("_win"); else if (document.querySelector(".field__button-box").classList.contains("_loose")) document.querySelector(".field__button-box").classList.remove("_loose"); else if (document.querySelector(".field__button-box").classList.contains("_draw")) document.querySelector(".field__button-box").classList.remove("_draw");
        sessionStorage.removeItem("current-protect");
        if (document.querySelector(".actions-field__protect img").classList.contains("_anim")) document.querySelector(".actions-field__protect img").classList.remove("_anim");
    }
    const config_shop = {
        price_1: 2500,
        price_2: 5e3
    };
    if (document.querySelector(".shop")) {
        document.querySelectorAll(".protect-shop__price")[0].textContent = config_shop.price_1;
        document.querySelectorAll(".protect-shop__price")[1].textContent = config_shop.price_2;
    }
    document.addEventListener("click", (e => {
        let targetElement = e.target;
        let current_bet = +sessionStorage.getItem("current-bet");
        let current_bank = +sessionStorage.getItem("money");
        if (targetElement.closest(".background__button") && 1 == targetElement.closest(".background__button").dataset.btn) {
            sessionStorage.setItem("preloader", true);
            preloader.classList.add("_hide");
            wrapper.classList.add("_visible");
            if (document.querySelector(".main") && document.querySelector(".preloader").classList.contains("_hide")) document.querySelector(".main").classList.add("_active");
        }
        if (targetElement.closest(".background__button") && 2 == targetElement.closest(".background__button").dataset.btn) location.href = "game.html";
        if (targetElement.closest(".block-bet__minus")) if (current_bet > 50) {
            sessionStorage.setItem("current-bet", current_bet - 50);
            document.querySelector(".block-bet__coins").textContent = sessionStorage.getItem("current-bet");
        }
        if (targetElement.closest(".block-bet__plus")) if (current_bank - 49 > current_bet) {
            sessionStorage.setItem("current-bet", current_bet + 50);
            document.querySelector(".block-bet__coins").textContent = sessionStorage.getItem("current-bet");
        } else no_money(".check");
        if (targetElement.closest(".shield") && 1 == targetElement.closest(".shield").dataset.thing) {
            sessionStorage.setItem("current-thing", 1);
            write_thing(1);
        }
        if (targetElement.closest(".shield") && 2 == targetElement.closest(".shield").dataset.thing) {
            sessionStorage.setItem("current-thing", 2);
            write_thing(2);
        }
        if (targetElement.closest(".shield") && 3 == targetElement.closest(".shield").dataset.thing) {
            sessionStorage.setItem("current-thing", 3);
            write_thing(3);
        }
        if (targetElement.closest(".protect-shop__price") && 1 == targetElement.closest(".protect-shop__price").dataset.price) if (+sessionStorage.getItem("money") >= config_shop.price_1) {
            delete_money(config_shop.price_1, ".check");
            if (sessionStorage.getItem("protect-1")) sessionStorage.setItem("protect-1", +sessionStorage.getItem("protect-1") + 1); else sessionStorage.setItem("protect-1", 1);
        } else no_money(".check");
        if (targetElement.closest(".protect-shop__price") && 2 == targetElement.closest(".protect-shop__price").dataset.price) if (+sessionStorage.getItem("money") >= config_shop.price_2) {
            delete_money(config_shop.price_2, ".check");
            if (sessionStorage.getItem("protect-2")) sessionStorage.setItem("protect-2", +sessionStorage.getItem("protect-2") + 1); else sessionStorage.setItem("protect-2", 1);
        } else no_money(".check");
        if (targetElement.closest(".protects__button") && 1 == targetElement.closest(".protects__button").dataset.protect) {
            sessionStorage.setItem("current-protect", 1);
            remove_class(".protects__item", "_selected");
            targetElement.closest(".protects__item").classList.add("_selected");
            check_write_protect();
        }
        if (targetElement.closest(".protects__button") && 2 == targetElement.closest(".protects__button").dataset.protect) {
            sessionStorage.setItem("current-protect", 2);
            remove_class(".protects__item", "_selected");
            targetElement.closest(".protects__item").classList.add("_selected");
            check_write_protect();
        }
        if (targetElement.closest(".shields-select__button-play")) {
            document.querySelector(".background_game").classList.add("_hide");
            document.querySelector(".battle").classList.remove("_hide");
            start_game();
            document.querySelectorAll(".field__heroe").forEach((el => el.classList.add("_active")));
        }
        if (targetElement.closest(".field__button")) {
            document.querySelector(".background_game").classList.remove("_hide");
            document.querySelector(".battle").classList.add("_hide");
            reset_game();
        }
    }));
    window["FLS"] = true;
    isWebp();
    addLoadedClass();
})();