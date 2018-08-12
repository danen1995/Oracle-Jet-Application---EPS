/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your about ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'viewModels/potrosnja', 'jquery', 'ojs/ojchart', 'ojs/ojtoolbar', 'ojs/ojtable', 'ojs/ojarraytabledatasource'],
        function (oj, ko, potrosnja) {
            function AboutViewModel() {
                var self = this;
                var rootViewModel = ko.dataFor(document.getElementById('mainContent'));
                self.nesto = ko.observable("");
                self.idIzabranogRacuna = ko.observable("");
                self.idIzabranogPotrosaca = ko.observable("");
                self.stackValue = ko.observable('off');
                self.orientationValue = ko.observable('vertical');
                self.barSeriesValue = ko.observableArray();
                self.racuni = ko.observableArray();
                self.potrosaci = ko.observableArray();
                self.potrosaci.removeAll();
                self.idUlogovanogKupca = rootViewModel.idUlogovanogKupca();
                $.getJSON("http://localhost:8082/vratiPotrosaceZaKupca?idKupca=" + self.idUlogovanogKupca).
                        then(function (movies) {
                            $.each(movies, function () {
                                self.potrosaci.push({
                                    idPotrosaca: this.idPotrosaca,
                                    edBroj: this.edBroj,
                                    kategorijaPotrosnje: this.kategorijaPotrosnje,
                                    vrstaSnabdevanja: this.vrstaSnabdevanja,
                                    adresa: this.idAdreseMm.grad + ", " + this.idAdreseMm.opstina + ", " + this.idAdreseMm.ulica
                                });
                            });
                        });
                self.listaPotrosaca = new oj.ArrayTableDataSource(
                        self.potrosaci,
                        {idAttribute: 'idPotrosaca'}
                );

                self.prikaziRacune = function () {
                    self.racuni.removeAll();
                    self.barSeriesValue.removeAll();
                    self.idPotrosaca = rootViewModel.idIzabranogPotrosaca();
                    $.getJSON("http://localhost:8082/vratiRacuneZaPotrosaca?idPotrosaca=" + self.idPotrosaca).
                            then(function (movies) {
                                $.each(movies, function () {
                                    self.racuni.push({
                                        idRacuna: this.idRacuna,
                                        mestoIzdavanja: this.mestoIzdavanja,
                                        ukupanIznos: this.ukupanIznos,
                                        idOp: this.idOp.mesec + " " + this.idOp.godina,
                                        pozivNaBroj: this.pozivNaBroj
                                    });
                                });
                                var x = document.getElementById("divId");
                                x.style.display = "block";
                                var z = document.getElementById("buttons");
                                z.style.display = "block";
                                var y = document.getElementById("chart-container");
                                y.style.display = "block";
                            }).then(function () {
                        var barSeries = [{name: self.racuni()[0].idOp, items: [self.racuni()[0].ukupanIznos]},
                            {name: self.racuni()[1].idOp, items: [self.racuni()[1].ukupanIznos]},
                            {name: self.racuni()[2].idOp, items: [self.racuni()[2].ukupanIznos]},
                            {name: self.racuni()[3].idOp, items: [self.racuni()[3].ukupanIznos]},
                            {name: self.racuni()[4].idOp, items: [self.racuni()[4].ukupanIznos]},
                            {name: self.racuni()[5].idOp, items: [self.racuni()[5].ukupanIznos]},
                            {name: self.racuni()[6].idOp, items: [self.racuni()[6].ukupanIznos]},
                            {name: self.racuni()[7].idOp, items: [self.racuni()[7].ukupanIznos]},
                            {name: self.racuni()[8].idOp, items: [self.racuni()[8].ukupanIznos]},
                            {name: self.racuni()[9].idOp, items: [self.racuni()[9].ukupanIznos]},
                            {name: self.racuni()[10].idOp, items: [self.racuni()[10].ukupanIznos]},
                            {name: self.racuni()[11].idOp, items: [self.racuni()[11].ukupanIznos]}];
                        self.barSeriesValue(barSeries);
                    });
                };
                self.currentSelection = function ()
                {
                    var selectionObj = $("#table").ojTable("option", "selection");
                    var rootViewModel = ko.dataFor(document.getElementById('mainContent'));
                    rootViewModel.idIzabranogPotrosaca(selectionObj[0].startKey.row);
                    self.idIzabranogPotrosaca(rootViewModel.idIzabranogPotrosaca());
                    self.prikaziRacune();
                    /*var x = document.getElementById("izabraniRacun");
                     x.style.display = "block";*/
                };
                self.listaRacuna = new oj.ArrayTableDataSource(
                        self.racuni,
                        {idAttribute: 'idRacuna'}
                );
                self.fPrikaziPotrosnju = function ()
                {
                    var mytable = document.getElementById('tabelaRacuni');
                    var selectionObj = $("#tabelaRacuni").ojTable("option", "selection");
                    var rootViewModel = ko.dataFor(document.getElementById('mainContent'));
                    rootViewModel.idIzabranogRacuna(selectionObj[0].startKey.row);
                    self.idIzabranogRacuna(rootViewModel.idIzabranogRacuna());
                    console.log(self.idIzabranogRacuna());

                    oj.Router.rootInstance.go('potrosnja');
                    potrosnja.ucitajTabeluIPite();
                };
                self.fVratiRacun = function ()
                {
                    var mytable = document.getElementById('tabelaRacuni');
                    var selectionObj = $("#tabelaRacuni").ojTable("option", "selection");
                    var rootViewModel = ko.dataFor(document.getElementById('mainContent'));
                    rootViewModel.idIzabranogRacuna(selectionObj[0].startKey.row);
                    self.idIzabranogRacuna(rootViewModel.idIzabranogRacuna());
                    self.vratiPdf();
                };
                self.vratiPdf = function () {
                    window.open("http://localhost:8082/vratiPdf?idRacuna=" + self.idIzabranogRacuna(), '_blank');
                };
            }
            return new AboutViewModel();
        }
);
