/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your incidents ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojTable'],
        function (oj, ko, $) {
           // ko.applyBindings(null, document.getElementById('dialogWrapper'));
            function IncidentsViewModel() {
                var self = this;
                /*self.data = ko.observableArray();

                $.getJSON("http://localhost:8082/vratiKorisnike").
                        then(function (movies) {
                            $.each(movies, function () {
                                self.data.push({
                                    idKorisnika: this.idKorisnika,
                                    korisnickoIme: this.korisnickoIme,
                                    lozinka: this.lozinka
                                });
                            });
                        });
      
                self.dataSource = new oj.ArrayTableDataSource(
                        self.data,
                        {idAttribute: 'idKorisnika'}
                );*/
            }
            return new IncidentsViewModel();
        }
);
