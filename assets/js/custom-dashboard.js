$(document).ready(function() {
    // Side Bar
    $('.sideBarBtn, .closeBtn').click(function(){
        $('.sideBarMenuContainer').toggleClass('active');
        $('.mainBodyContent').toggleClass('active');
    });


    // Right Bar
    $('.mainBodyRightContainerTrigger, .mainBodyRightCloseBtn, .mainBodyRightDivCloseContainer').click(function(){
        $('.mainBodyRightContainer').toggleClass('active');
        $('.mainBodyRightDiv').addClass('animate__bounceInRight');
    });

    $('.panelRightBarSwitch').click(function(){
        let dataTabValue = $(this).attr('data-right-tab');
        $('.rightTabContent[data-right-tabcontent]').removeClass('active');
        $('.rightTabContent[data-right-tabcontent='+dataTabValue+']').addClass('active');
    });

    $('.panelTabSwitch').click(function(){
        let dataTabValue = $(this).attr('data-tab');
        $('.panelTabSwitch').removeClass('active');
        $(this).addClass('active');

        $('.materialCard[data-tab-content]').removeClass('active');
        $('.materialCard[data-tab-content='+dataTabValue+']').addClass('active');

    });


    // Dropdown Item,
    $('a.dropdown-item').click(function(){
        let dropdownItemValue = $(this).html();
        $(this).closest('.btn-group').find('.dropdown-toggle').html(dropdownItemValue + ' ');
    });


    // Material Tab
    $('.materialTabList li').click(function(){
        $('.materialTabList li').removeClass('active');
        $('.materialTabListHeader').html($(this).html());
        $(this).addClass('active');
        
        

        let dataTabId = $(this).attr('data-tab-id');
        $('.materialFormInputDiv[data-tab-divID]').removeClass('active');
        $('.materialFormInputDiv[data-tab-divID="'+dataTabId+'"]').addClass('active');
    });


    // Material MultiStep Form
    $(".materialFormInputDiv form").submit(function(event){
        event.preventDefault();
    });

    function materialMultiStepForm(thisElement, action) {
        let dataTabCategory = thisElement.parents('.materialFormInputDiv').attr('data-tab-divID');
        let materialFormInputProcess = parseInt(thisElement.parents('.materialFormInputProcess').attr('data-form-process'));
        let dataTabCategoryNum = $('.materialFormInputDiv[data-tab-divID="'+dataTabCategory+'"] .materialFormInputProcess').length;

        if (action === 'submit') {
            // Go to next Form Tab
            materialFormInputProcess++; 
        } else if (action === 'progressLink') {
            // Switch to Tabs
            materialFormInputProcess = thisElement.attr('data-tab-id');
        }

        if (materialFormInputProcess > dataTabCategoryNum) {
            materialFormInputProcess = dataTabCategoryNum;
        } else if(materialFormInputProcess < 1) {
            materialFormInputProcess = 1;
        }

        $('.materialFormInputDiv[data-tab-divID="'+dataTabCategory+'"] .materialFormInputProcess').removeClass('active');
        $('.materialFormInputDiv[data-tab-divID="'+dataTabCategory+'"] .materialFormInputProcess[data-form-process="'+ materialFormInputProcess +'"]').addClass('active');
        window.scrollTo({top: 0, behavior: 'smooth'});

        // Increase Progress Bar
        $('.materialFormInputDiv[data-tab-divID="'+dataTabCategory+'"] .materialProcessList li').removeClass('active');
        $('.materialFormInputDiv[data-tab-divID="'+dataTabCategory+'"] .materialProcessList li[data-tab-id="'+materialFormInputProcess+'"]').addClass('active');
        window.scrollTo({top: 0, behavior: 'smooth'});
    }

    $('.materialFormInputDiv .materialFormInputProcess[data-form-process] input[type="submit"]').click(function() {
        let thisElement = $(this);
        materialMultiStepForm(thisElement, 'submit');
     });


    $('.materialProcessList li').click(function() {
        let thisElement = $(this);
        materialMultiStepForm(thisElement, 'progressLink');
    });


    // Modal Control
    $('.materialModalTrigger').on('click', function() {
        $('.materialModalDivContainer').fadeIn(400);
    })
    $('.materialModalCancel').on('click', function() {
        $('.materialModalDivContainer').fadeOut(400);
    })


    // Password Reveal
    $('.materialFormGroupInput .showHideBtn.showPassword').click(function(event){
        event.preventDefault();
        $('.userRegFormCard .passwordInput').attr('type', 'text');
        $('.materialFormGroupInput .showHideBtn').removeClass('active');
        $('.materialFormGroupInput .showHideBtn.hidePassword').addClass('active');
    });

    $('.materialFormGroupInput .showHideBtn.hidePassword').click(function(){
        $('.userRegFormCard .passwordInput').attr('type', 'password');
        $('.materialFormGroupInput .showHideBtn').removeClass('active');
        $('.materialFormGroupInput .showHideBtn.showPassword').addClass('active');
    });
});


    $('.userRegFormCard form').submit(function(event){
        event.preventDefault();
    });
    
    // Form Input Validation Messages
    const formInputValidationMessages = {
        createAccount: {
            emailAddress: ['Email Address is required', 'Invalid Email Address'],
            firstName: ['First Name is required', 'First Name is too short'],
            lastName: ['Last Name is required', 'Last Name is too short'],
            password: ['Set your password', 'Minimum length of 6 characters', 'It must contain at least one number, and a special character']
        },
        login: {
            emailAddress: ['Email Address is required', 'Invalid Email Address'],
            password: ['Please enter your password', 'Incorrect Password']
        },
        forgotPassword: {
            emailAddress: ['Please enter your email', 'Invalid Email Address']
        },
        changePassword: {
            password: ['Please enter your new password', 'Password does not match']
        }
    }


    // Email Input Regex
    function validateEmailAddress(inputValue) {
        const emailValidRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (inputValue.match(emailValidRegex)) {
            return true;
        } else {
            return false;
        }
    }


    // Input Error Messages Function
    function inputValidationFunc(selector, responseMessage, responseState) {
        if (responseState === 'open') {
            if($('.'+ selector + ' .inputFieldInfo').css('display') !== 'block') {
                $('.'+ selector + ' .inputFieldInfo').fadeIn(300);
            }
            $('.'+ selector + ' .inputFieldInfo span').html(responseMessage);
        }
        if (responseState === 'close') {
            $('.'+ selector + ' .inputFieldInfo').fadeOut(300);
        }
    }


    // Email Input Validation (Create Account)
    function emailInputValidationCreateAccount(inputValue) {
        if(inputValue === ""){
            inputValidationFunc('emailAddressInput', formInputValidationMessages.createAccount.emailAddress[0], 'open');
            return false;
        } else {
            if(!validateEmailAddress(inputValue.toLowerCase())) {
                inputValidationFunc('emailAddressInput', formInputValidationMessages.createAccount.emailAddress[1], 'open');
                return false;
            } else {
                inputValidationFunc('emailAddressInput', '', 'close');
                return true;
            }
        }
    }

    $('.createAccountDiv .emailAddress').on( "keyup blur change", function() {
        let inputValue = $(this).val();
        emailInputValidationCreateAccount(inputValue);
    });


    // FIrst Name Input Validation  (Create Account)
    function firstNameInputValidationCreateAccount(inputValue) {
        if(inputValue === ""){
            inputValidationFunc('firstNameInput', formInputValidationMessages.createAccount.firstName[0], 'open');
            return false;
        } else {
            if(inputValue.length < 3){
                inputValidationFunc('firstNameInput', formInputValidationMessages.createAccount.firstName[1], 'open');
                return false;
            } else {
                inputValidationFunc('firstNameInput', '', 'close');
                return true;
            }
        }
    }

    $('.createAccountDiv .firstName').on( "keyup blur change", function() {
        let inputValue = $(this).val();
        firstNameInputValidationCreateAccount(inputValue);
    });


    // Last Name Input Validation  (Create Account)
    function lastNameInputValidationCreateAccount(inputValue) {
        if(inputValue === ""){
            inputValidationFunc('lastNameInput', formInputValidationMessages.createAccount.lastName[0], 'open');
            return false;
        } else {
            if(inputValue.length < 3){
                inputValidationFunc('lastNameInput', formInputValidationMessages.createAccount.lastName[1], 'open');
                return false;
            } else {
                inputValidationFunc('lastNameInput', '', 'close');
                return true;
            }
        }
    }

    $('.createAccountDiv .lastName').on( "keyup blur change", function() {
        let inputValue = $(this).val();
        lastNameInputValidationCreateAccount(inputValue);
    });


    // Password Input Validation  (Create Account)
    function passwordInputValidationCreateAccount(inputValue) {
        if(inputValue === ""){
            inputValidationFunc('passwordInputDiv', formInputValidationMessages.createAccount.password[0], 'open');
            return false;
        } else {
            if(inputValue.length < 6){
                inputValidationFunc('passwordInputDiv', formInputValidationMessages.createAccount.password[1], 'open');
                return false;
            } else {
                if(!/^(?=.*[0-9])(?=.*[!@#$%^&*_~.-])[a-zA-Z0-9!@#$%^&*_~.-]{6,36}$/.test(inputValue)) {
                    inputValidationFunc('passwordInputDiv', formInputValidationMessages.createAccount.password[2], 'open');
                    return false;
                } else {
                    inputValidationFunc('passwordInputDiv', '', 'close');
                    return true;
                }
            }
        }
    }

    $('.createAccountDiv .passwordInput').on( "keyup blur change", function() {
        let inputValue = $(this).val();
        passwordInputValidationCreateAccount(inputValue)
    });


    // Email Input Validation (Login)
    function emailInputValidationLogin(inputValue) {
        if(inputValue === ""){
            inputValidationFunc('emailAddressInput', formInputValidationMessages.login.emailAddress[0], 'open');
            return false;
        } else {
            if(!validateEmailAddress(inputValue.toLowerCase())) {
                inputValidationFunc('emailAddressInput', formInputValidationMessages.login.emailAddress[1], 'open');
                return false;
            } else {
                inputValidationFunc('emailAddressInput', '', 'close');
                return true;
            }
        }
    }

    $('.loginDiv .emailAddress').on( "keyup blur change", function() {
        let inputValue = $(this).val();
        emailInputValidationLogin(inputValue);
    });



    // Password Input Validation (Login)
    function passwordInputValidationLogin(inputValue) {
        if(inputValue === ""){
            inputValidationFunc('passwordInputDiv', formInputValidationMessages.login.password[0], 'open');
            return false;
        } else {
            inputValidationFunc('passwordInputDiv', '', 'close');
            return true;
        }
    }

    $('.loginDiv .passwordInput').on( "keyup blur change", function() {
        let inputValue = $(this).val();
        passwordInputValidationLogin(inputValue);
    });



    // Forgot Password Validation (Forgot Password)
    function forgotPasswordInputValidationLogin(inputValue) {
        if(inputValue === ""){
            inputValidationFunc('emailAddressInput', formInputValidationMessages.forgotPassword.emailAddress[0], 'open');
            return false;
        } else {
            if(!validateEmailAddress(inputValue.toLowerCase())) {
                inputValidationFunc('emailAddressInput', formInputValidationMessages.forgotPassword.emailAddress[1], 'open');
                return false;
            } else {
                inputValidationFunc('emailAddressInput', '', 'close');
                return true;
            }
        }
    }
    
    $('.forgotPasswordDiv .emailAddress').on( "keyup blur change", function() {
        let inputValue = $(this).val();
        forgotPasswordInputValidationLogin(inputValue)
    });



    // Change Password Input Validation (Change Password)
    function changePasswordInputValidationLogin(inputValue) {
        if(inputValue === ""){
            inputValidationFunc('changePasswordInputDiv', formInputValidationMessages.createAccount.password[0], 'open');
            return false;
        } else {
            if(inputValue.length < 6){
                inputValidationFunc('changePasswordInputDiv', formInputValidationMessages.createAccount.password[1], 'open');
                return false;
            } else {
                if(!/^(?=.*[0-9])(?=.*[!@#$%^&*_~.-])[a-zA-Z0-9!@#$%^&*_~.-]{6,36}$/.test(inputValue)) {
                    inputValidationFunc('changePasswordInputDiv', formInputValidationMessages.createAccount.password[2], 'open');
                    return false;
                } else {
                    inputValidationFunc('changePasswordInputDiv', '', 'close');
                    return true;
                }
            }
        }
    }

    $('.changePasswordInputDiv .passwordInput').on( "keyup blur change", function() {
        let inputValue = $(this).val();
        changePasswordInputValidationLogin(inputValue);
    });



    // Change Password Input Validation (Confirm Password)
    function confirmPasswordInputValidationLogin(inputValue) {
        if(inputValue === ""){
            inputValidationFunc('confirmPasswordInputDiv', formInputValidationMessages.changePassword.password[0], 'open');
            return false;
        } else {
            if(inputValue !== $('.changePasswordInputDiv .passwordInput').val()) {
                inputValidationFunc('confirmPasswordInputDiv', formInputValidationMessages.changePassword.password[1], 'open');
                return false;
            } else {
                inputValidationFunc('confirmPasswordInputDiv', '', 'close');
                return true;
            }
        }
    }

    $('.confirmPasswordInputDiv .passwordInput').on( "keyup blur change", function() {
        let inputValue = $(this).val();
        confirmPasswordInputValidationLogin(inputValue);
    });



// DataTables
var dataTableFunc = (tableID) => {
    $('#' + tableID).DataTable({
        dom: 'Bfrtip',
        buttons: [
            'print', 'pdf', 'csv', 'excel'
        ]
    });
    $('.dataTables_wrapper .dt-buttons').appendTo('.printDiv');
    $('.dataTables_wrapper .dataTables_filter').appendTo('.filterDiv');
    $('.dataTables_filter label input').attr('placeholder', 'Search')
}



// Toggle Darkmode
var lightDarkModeFunc = () => {
    $('.lightDarkModeDiv').click(function(){
        $(this).toggleClass('active');
        if ($(this).hasClass('active')) {
            $('body').attr('data-theme', 'dark');
        }
        else {
            $('body').attr('data-theme', 'light');
        }
    });
}

// Settlement Pie Chart
var settlementPieChart = (pieChartPercent) => {
    let settlementOptions = {
        series: [pieChartPercent],
        chart: {
            height: 350,
            type: 'radialBar',
            toolbar: {
                show: true
            }
        },
        plotOptions: {
        radialBar: {
            startAngle: -135,
            endAngle: 225,
            hollow: {
                margin: 0,
                size: '65%',
                background: '#0E073A',
                image: undefined,
                imageOffsetX: 0,
                imageOffsetY: 0,
                position: 'front',
                    dropShadow: {
                        enabled: true,
                        top: 3,
                        left: 0,
                        blur: 2,
                        opacity: 0.1
                    }
            },
            track: {
                    background: 'rgba(109, 60, 215, 0.055)',
                    strokeWidth: '67%',
                    margin: 0, // margin is in pixels
                    dropShadow: {
                    enabled: true,
                    top: -3,
                    left: 0,
                    blur: 4,
                    opacity: 0.35
                }
            },
        
            dataLabels: {
            show: true,
                name: {
                offsetY: -10,
                show: true,
                color: '#ececec',
                fontSize: '17px'
            },
            value: {
                formatter: function(val) {
                return parseInt(val);
                },
                color: '#ffffff',
                fontSize: '36px',
                show: true,
            }
            }
        }
        },
    fill: {
        type: 'gradient',
        gradient: {
            shade: 'dark',
            type: 'horizontal',
            shadeIntensity: 0.4,
            gradientToColors: ['#5118CD'],
            inverseColors: true,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 100]
        }
    },
    stroke: {
        lineCap: 'round'
    },
        labels: ['Percent'],
    };

    let settlementChartVar = new ApexCharts(document.querySelector(".settlementChart"), settlementOptions);
    settlementChartVar.render();
}


// Reporting Line Chart
var reportingLineChart = (reportingLineChartArray) => {
    let reportingTransactionsLineOptions = {
        series: [
            {
              name: "Customers",
              data: reportingLineChartArray.data
            }
        ],
        chart: {
            height: 350,
            type: 'line',
            dropShadow: {
                enabled: true,
                color: '#000',
                top: 18,
                left: 7,
                blur: 10,
                opacity: 0.2
            },
            toolbar: {
              show: false
            }
        },
        colors: ['#5118CD', '#545454'],
        dataLabels: {
            enabled: true,
        },
        stroke: {
            curve: 'smooth'
        },
        title: {
            text: '',
            align: 'left'
        },
        grid: {
            borderColor: '#e7e7e7',
            row: {
                colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                opacity: 0.5
            },
        },
        markers: {
            size: 1
        },
        xaxis: {
            categories: reportingLineChartArray.xAxis,
            title: {
                text: 'Month'
            }
        },
        yaxis: {
            title: {
              text: 'No of Customers'
            },
            min: 5,
            max: 40
        },
        legend: {
            position: 'top',
            horizontalAlign: 'right',
            floating: true,
            offsetY: -25,
            offsetX: -5
        }
    };
    let reportingTransactionLineChartVar = new ApexCharts(document.querySelector(".reportingTransactionsLineChart"), reportingTransactionsLineOptions);
    reportingTransactionLineChartVar.render();
}


// Reporting Bar Chart
var reportingBarChart = (reportingBarChartArray) => {
    let reportingTransactionsBarOptions = {
        series: [{
            name: 'USD',
            data: reportingBarChartArray.data
        }],
        chart: {
            type: 'bar',
            height: 350
        },
        plotOptions: {
            bar: {
            horizontal: false,
            columnWidth: '50%',
            endingShape: 'rounded'
            },
        },
        dataLabels: {
            enabled: false
        },
        colors:['#5118CD'],
        stroke: {
            show: true,
            width: 1,
            colors: ['transparent']
        },
        xaxis: {
            categories: reportingBarChartArray.xAxis,
        },
        yaxis: {
            title: {
            text: 'Transactions'
            }
        },
        fill: {
            opacity: 1
        },
        tooltip: {
            y: {
            formatter: function (val) {
                return "$ " + val + ""
            }
            }
        }
    };
    let reportingTransactionsBarChartVar = new ApexCharts(document.querySelector(".reportingTransactionsBarChart"), reportingTransactionsBarOptions);
    reportingTransactionsBarChartVar.render();
}