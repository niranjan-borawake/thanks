(function () {
    window.THANKS = window.THANKS || {};
    THANKS.start = function () {
        var names = ['PRASHANT     ',
                     '    RAKHI    ',
                     '      VAIBHAV',
                     '     NINAD   ',
                     '    PANKAJ   ',
                     '       SNEHAL',
                     '',
                     '       TUSHAR',
                     '   PRAMOD    ',
                     '',
                     '     SAURABH ',
                     '    ABHIJEET ',
                     '',
                     '  DEBJIT     ',
                     '      NEHA   ',
                     '    NIRANJAN ',
                     '       MANASI'
                    ];
        $('.grid').html(_.template($('#column-tmpl').html()));
        _.each($('.column'), function (col, index) {
            var $rows = $('<div/>'),
                name = '             ';
            name = names[index] || '             ';
            name.split('').forEach(function (char, index) {
                $rows.append(_.template($('#cube-tmpl').html(), {
                    THANKS: THANKS,
                    char: char
                }));

            });
            $(col).html($rows.html());
        });

        $('.shape').shape();
        $('.shape').shape('flip up');
        (function flip() {

            var $columns = $('.column'),
                intervalHandler = null,
                intervalHandlers = {};
            _.each($columns, function (column) {
                var $shapes = $(column).find('.shape'),
                    columnIndex = $(column).attr('data-index');
                intervalHandlers[columnIndex] = setInterval(function () {
                    $($shapes[Math.floor(Math.random() * $shapes.length)]).shape('flip down');
                    $($shapes[Math.floor(Math.random() * $shapes.length)]).shape('flip up');
                    $($shapes[Math.floor(Math.random() * $shapes.length)]).shape('flip left');
                    $($shapes[Math.floor(Math.random() * $shapes.length)]).shape('flip right');
                }, 1000);
            });

            $('.column').hover(function (event) {
                var columnIndex = $(event.currentTarget).attr('data-index'),
                    $shapes;
                _.each($(event.currentTarget).find('.shape'), function (s) {
                    $(s).find('.center').text($(s).attr('data-letter'));
                });
                clearInterval(intervalHandlers[columnIndex]);
                $(event.currentTarget).addClass('flipsStopped');

                if ($('.flipsStopped').length === 17) {
                    $shapes = $('.column .shape:nth-child(8)');
                    $shapes.addClass('flipsStart');
                    setInterval(function () {
                        $($shapes[Math.floor(Math.random() * $shapes.length)]).shape('flip down');
                        $($shapes[Math.floor(Math.random() * $shapes.length)]).shape('flip up');
                        $($shapes[Math.floor(Math.random() * $shapes.length)]).shape('flip left');
                        $($shapes[Math.floor(Math.random() * $shapes.length)]).shape('flip right');
                    }, 50);
                }
            });
        }());

    };
    THANKS.getRandomLetter = function () {
        var alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        return alphabets.charAt(Math.floor(Math.random() * alphabets.length));
    }
}());
