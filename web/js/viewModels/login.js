/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your dashboard ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout',
    'jquery', 'ojs/ojmodel', 'ojs/ojinputtext', 'ojs/ojbutton', 'ojs/ojtable'],
        function (oj, ko, $) {
            function DashboardViewModel() {
                var self = this;
                self.serviceURL = "http://localhost:8082/logovanje";
                self.username = ko.observable("digit");
                self.password = ko.observable("digit");
                self.URL = ko.pureComputed(function () {
                    return self.serviceURL + "?user=" + self.username() + "&pass=" + self.password();
                }
                );
                self.uspesnaRegistracija = function () {
                    var m = document.getElementById("myDIV");
                    m.style.display = "block";
                }
                self.login = function () {
                    console.log(self.URL());
                    $.getJSON(self.URL(), function (result) {
                        self.jsonString = JSON.stringify(result);
                        console.log(self.jsonString);
                    }).fail(function (jqXHR, status, error) {
                        var x = document.getElementById("myDIV");
                        x.style.display = "block";
                    }).then(function () {
                        var korisnik = JSON.parse(self.jsonString);
                        var navData = [
                            {name: 'Uputstvo za korišćenje', id: 'incidents',
                                iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-fire-icon-24'},
                            {name: 'Osnovni podaci', id: 'home',
                                iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-people-icon-24'},
                            {name: 'Računi', id: 'racuni',
                                iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-info-icon-24'},
                            {name: 'Potrošnja', id: 'potrosnja',
                                iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-info-icon-24'}

                        ];
                        var rootViewModel = ko.dataFor(document.getElementById('mainContent'));
                        rootViewModel.navDataSource.reset(navData, {idAttribute: 'id'});
                        rootViewModel.userLogin(self.username());
                        rootViewModel.userID(korisnik.idKorisnika);
                        console.log(korisnik.idKorisnika);
                        rootViewModel.isLoggedIn('true');
                        rootViewModel.restSessionId("");
                        self.username(null);
                        self.password(null);
                        //oj.Router.sync();
                    }).then(function () {
                        oj.Router.rootInstance.go('home');
                    });
                };
            }
//            $(function () {
//                ko.applyBindings(new DashboardViewModel(), document.getElementById('divId'));
//            });
            return new DashboardViewModel();
        }
);
