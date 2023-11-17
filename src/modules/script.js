$(function () {
    let dropdownIndex = 0;
    let sectionIndex = 1;
    let dropdownLength = $('.js-dropdown').length;
    // let sectionLength = $('.js-form__section').length;
    let location = $('.js-languages').data('location')
    let selectedCurrency = $(".js-form__item").data('selectedcurrency')

    let coefficient = 10;
    let realCoef = 1;


    $(".js-sum").text(($("#gameCurrency").val() / 100 * coefficient * realCoef).toFixed(2))

    $("#gameCurrency").inputmask();
    $("#name").inputmask({
        showMaskOnHover: false,

    });
    $("#gameCurrency").on("input", function (event) {
        if ($("#gameCurrency").val() < 100) {
            $("#gameCurrency").val(100)
        }
        if ($("#gameCurrency").val() > 10000) {
            $("#gameCurrency").val(10000)
        }
        $("#range").val(event.target.value)
        switch (selectedCurrency) {
            case "EU":
                coefficient = 10
                break;
            case "DE":
                coefficient = 15
                break;
        }
        switch (location) {
            case "EUR":
                realCoef = 1
                break;
            case "USD":
                realCoef = 1.2
                break;
        }
        $(".js-sum").text(($("#gameCurrency").val() / 100 * coefficient * realCoef).toFixed(2))
    })

    $("#range").on("input", function (event) {
        $("#gameCurrency").val(event.target.value)
        switch (selectedCurrency) {
            case "EU":
                coefficient = 10
                break;
            case "DE":
                coefficient = 15
                break;
        }
        switch (location) {
            case "EUR":
                realCoef = 1
                break;
            case "USD":
                realCoef = 1.2
                break;
        }
        $(".js-sum").text(($("#gameCurrency").val() / 100 * coefficient * realCoef).toFixed(2))
    })

    $('.js-dropdown').addClass("disabled");
    $('.js-dropdown:first').removeClass("disabled");

    $('.js-dropdown').on('click', function () {
        $(this).find(".js-arrow").toggleClass("active");
        $(this).find(".js-dropdown__menu").slideToggle("slow");
    })
    $('.js-dropdown__item').on('click', function (e) {
        e.preventDefault();
        let selected = $(this).text();
        let data = $(this).data("gamecurrency")
        $(this).closest(".js-dropdown").find(".js-form__item").text(selected);
        if (data) {
            $(this).closest(".js-dropdown").find(".js-form__item").attr("data-gamecurrency", data)
            selectedCurrency = data
            switch (selectedCurrency) {
                case "EU":
                    coefficient = 10
                    break;
                case "DE":
                    coefficient = 15
                    break;
            }
            switch (location) {
                case "EUR":
                    realCoef = 1
                    break;
                case "USD":
                    realCoef = 1.2
                    break;
            }
            $(".js-sum").text(($("#gameCurrency").val() / 100 * coefficient * realCoef).toFixed(2))
        }
        $(this).closest(".js-dropdown").addClass("valid disabled")
        dropdownIndex++;
        $(".js-dropdown").eq(dropdownIndex).removeClass("disabled");
        if (dropdownIndex == dropdownLength) {
            $(".js-form__section").eq(sectionIndex).removeClass("disabled")
            $(".js-btn").prop("disabled", false)
        }
    })

    $(".js-languages").on("click", function () {
        $(this).toggleClass("active")
    })

    $(".js-language").on("click", function () {
        let dataLangSelect = $(this).data('lang')
        location = dataLangSelect
        $('.js-language').removeClass('active');
        $(this).toggleClass('active');

        switch (selectedCurrency) {
            case "EU":
                coefficient = 10
                break;
            case "DE":
                coefficient = 15
                break;
        }
        switch (location) {
            case "EUR":
                realCoef = 1
                break;
            case "USD":
                realCoef = 1.2
                break;
        }
        $(".js-sum").text(($("#gameCurrency").val() / 100 * coefficient * realCoef).toFixed(2))
    })

    $(".js-btn").on("click", function (e) {
        e.preventDefault()
        $(".js-popup").addClass("active")
        $(".js-overlay").addClass("active")
    })
    $(".js-close").on("click", function (e) {
        e.preventDefault()
        $(".js-popup").removeClass("active")
        $(".js-overlay").removeClass("active")
    })

});