/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your dashboard ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'viewModels/login', 'jquery', 'ojs/ojmodel',
    'ojs/ojinputtext', 'ojs/ojbutton', 'ojs/ojtable', 'ojs/ojpagingcontrol', 'ojs/ojcollectiontabledatasource'],
        function (oj, ko, login) {
            function RegKorViewModel() {
                var self = this;
                self.kodSaSlike = ko.observable("");
                self.korisnickoIme = ko.observable("");
                self.lozinka = ko.observable("");
                self.idKupca = ko.observable("");
                self.idKorisnika = ko.observable("");
                self.jmbg = ko.observable("");
                self.maticniBroj = ko.observable("");
                self.naplatniBroj = ko.observable("");
                self.naziv = ko.observable("");
                var rootViewModel = ko.dataFor(document.getElementById('mainContent'));
                var kupac = rootViewModel.kupacZaRegistraciju();
                self.jmbg(kupac.jmbg);
                self.idKupca(kupac.idKupca);
                self.maticniBroj(kupac.maticniBroj);
                self.naplatniBroj(kupac.naplatniBroj);
                self.naziv(kupac.naziv);
                self.urlkorisnici = 'http://localhost:8082/korisnici';
                self.pagingDatasource = ko.observable();
                self.collection = new oj.Collection(null, {
                    url: self.urlkorisnici,
                    fetchSize: 10,
                    model: new oj.Model.extend({
                        idAttribute: 'idKorisnika'
                    })
                });
                self.pagingDatasource = new oj.PagingTableDataSource(new oj.CollectionTableDataSource(self.collection));
                self.registracijaKorisnika = function ()
                {
                    if (self.korisnickoIme().length < 3 || self.lozinka().length < 3) {
                        document.getElementById("divError").style.display = "none";
                        document.getElementById("validacija").style.display = "block";
                    } else if (self.kodSaSlike() != "HEXGNp") {
                        document.getElementById("divError").style.display = "block";
                        document.getElementById("validacija").style.display = "none";
                    } else {
                        document.getElementById("divError").style.display = "none";
                        document.getElementById("validacija").style.display = "none";
                        self.collection.create(self.buildModel(), {
                            wait: true,
                            contentType: 'application/json',
                            success: function (response) {
                                self.collection.refresh();
                                var navData = [
                                    {name: 'Uputstvo za korišćenje', id: 'incidents',
                                        iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-info-icon-24 demo-icon-font-24'},
                                    {name: 'Ulogujte se', id: 'login',
                                        iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-education-icon-24 '},
                                    {name: 'Registracija brojila', id: 'registracijaBrojila',
                                        iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-chart-icon-24'}

                                ];
                                self.navDataSource = new oj.ArrayTableDataSource(navData, {idAttribute: 'id'});
                                alert("Uspešno ste se registrovali.");
                                window.location.href = "http://localhost:8383/Aplikacija/web/index.html";
                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                console.log('Error in Create: ' + textStatus);
                            }
                        });
                    }

                };
                self.buildModel = function ()
                {
                    return {
                        'korisnickoIme': self.korisnickoIme(),
                        'lozinka': self.lozinka(),
                        'idKupca': kupac
                    };
                };
            }
            return RegKorViewModel();
        }
);
