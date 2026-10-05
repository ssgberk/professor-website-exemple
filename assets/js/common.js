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

})();
