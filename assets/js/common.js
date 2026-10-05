// common.js

$(document).ready(function () {
    $('.ui.sidebar').sidebar('attach events', '.toc.item');
    if ($(window).width() >= 768) {
        $('.cv-section').visibility({
            once: false,
            offset: headerHeight() + 16, // > scroll-margin-top (header + 0.75rem)
            onTopPassed: function () {
                $('.ui.following.menu .item.active').removeClass('active');
                $(`.ui.following.menu .item[href$=${$(this).attr('id')}]`).addClass('active');
            },
            onBottomPassedReverse: function () {
                $('.ui.following.menu .item.active').removeClass('active');
                $(`.ui.following.menu .item[href$=${$(this).attr('id')}]`).addClass('active');
            }
        });
    };
});

// version
dayjs.extend(dayjs_plugin_relativeTime);
function updateVersion(timestamp) {
    $('#version, .version-text').text(dayjs(timestamp).fromNow());
};
var updateAt = $('meta[name=updated_at]').attr('content');
updateVersion(updateAt);
$('#version-icon, .version-icon').addClass('green');
setInterval(function () {
    updateVersion(updateAt);
}, 15000);

$('.ui.dropdown').dropdown();

function headerHeight() {
    return $('.site-header').outerHeight() || 0;
}

if ($(window).width() >= 768) {
    $('.ui.sticky').sticky({ offset: headerHeight() + 16 });
};

// header shadow only after scrolling
function toggleHeaderShadow() {
    $('.site-header').toggleClass('scrolled', window.scrollY > 0);
}
$(window).on('scroll', toggleHeaderShadow);
toggleHeaderShadow();

// back to top (smooth unless the user prefers reduced motion)
$('.back-to-top').on('click', function () {
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
});

// keyboard access for the mobile menu toggle
$('.toc.item').on('keydown', function (e) {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        $(this).trigger('click');
    }
});
/* ==========================================================================
   Content enhancements (spec 003-site-redesign). Vanilla JS, progressive:
   without JS everything stays visible and the print button stays hidden.
   ========================================================================== */
(function () {
    var desktop = window.matchMedia('(min-width: 768px)');

    // keep Fomantic's cached offsets (menu highlighting, sticky) in sync
    function refreshLayout() {
        if (!desktop.matches || !window.jQuery) return;
        var $ = window.jQuery;
        if ($.fn.visibility) $('.cv-section').visibility('refresh');
        if ($.fn.sticky) $('.ui.sticky').sticky('refresh');
    }

    // "Download CV (PDF)" uses the print stylesheet
    document.querySelectorAll('.js-print').forEach(function (btn) {
        btn.hidden = false;
        btn.addEventListener('click', function () { window.print(); });
    });

    // "Show all (k)" for long lists
    document.querySelectorAll('[data-collapsible]').forEach(function (box, i) {
        var items = Array.prototype.filter.call(box.children, function (el) {
            return el.hasAttribute('data-collapsible-item');
        });
        var limit = parseInt(box.getAttribute('data-limit'), 10) || 6;
        if (items.length <= limit) return;
        if (!box.id) box.id = 'cv-collapsible-' + i;
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'ui mini basic button cv-toggle';
        btn.setAttribute('aria-controls', box.id);
        function render(expanded) {
            items.forEach(function (el, idx) {
                el.classList.toggle('is-collapsed', !expanded && idx >= limit);
            });
            btn.setAttribute('aria-expanded', String(expanded));
            btn.innerHTML = '<i class="angle ' + (expanded ? 'up' : 'down') + ' icon" aria-hidden="true"></i>' +
                (expanded ? box.getAttribute('data-label-less')
                          : box.getAttribute('data-label-more') + ' (' + items.length + ')');
        }
        btn.addEventListener('click', function () {
            render(btn.getAttribute('aria-expanded') !== 'true');
            refreshLayout();
        });
        box.insertAdjacentElement('afterend', btn);
        render(false);
    });

    // publication filter chips (type x year)
    document.querySelectorAll('[data-filters]').forEach(function (bar) {
        var list = document.getElementById(bar.getAttribute('data-filters'));
        if (!list) return;
        var entries = list.querySelectorAll('.cv-pub');
        var groups = list.querySelectorAll('[data-year-group]');
        var count = bar.querySelector('.js-count');
        var empty = list.querySelector('.cv-empty');
        var state = { type: 'all', year: 'all' };
        bar.hidden = false;
        bar.addEventListener('click', function (e) {
            var chip = e.target.closest('.cv-chip');
            if (!chip) return;
            var key = chip.getAttribute('data-filter');
            state[key] = chip.getAttribute('data-value');
            bar.querySelectorAll('.cv-chip[data-filter="' + key + '"]').forEach(function (c) {
                c.setAttribute('aria-pressed', String(c === chip));
            });
            var shown = 0;
            entries.forEach(function (el) {
                var ok = (state.type === 'all' || el.getAttribute('data-type') === state.type) &&
                         (state.year === 'all' || el.getAttribute('data-year') === state.year);
                el.classList.toggle('is-filtered-out', !ok);
                if (ok) shown++;
            });
            groups.forEach(function (g) {
                g.classList.toggle('is-filtered-out', !g.querySelector('.cv-pub:not(.is-filtered-out)'));
            });
            if (count) count.textContent = shown;
            if (empty) empty.hidden = shown > 0;
            refreshLayout();
        });
    });

    // print: short URLs after external links, disclosures opened
    document.querySelectorAll('.cv-main a[href^="http"], .cv-profile a[href^="http"]').forEach(function (a) {
        var short = a.hostname.replace(/^www\./, '') + a.pathname.replace(/\/$/, '');
        if (short.length > 42) short = short.slice(0, 40) + '…';
        if (a.textContent.trim().replace(/\/$/, '') !== short) a.setAttribute('data-print-url', short);
    });
    var reopened = [];
    window.addEventListener('beforeprint', function () {
        document.querySelectorAll('details.cv-disclosure:not([open])').forEach(function (d) {
            d.open = true;
            reopened.push(d);
        });
    });
    window.addEventListener('afterprint', function () {
        reopened.forEach(function (d) { d.open = false; });
        reopened = [];
    });
})();
