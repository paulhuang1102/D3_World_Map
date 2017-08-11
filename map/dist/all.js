'use strict';

var countries = ['United Kingdom', 'Canada', 'Thailand'];
var bub = document.querySelector('.bubble');

var width = document.querySelector('.map').clientWidth,
    height = document.querySelector('.map').clientHeight,
    centered = void 0,
    click_point = void 0;

var projection = d3.geoMercator().scale(190).translate([width / 2.2, height / 1.4]);

var svg = d3.select('.map').append('svg').attr('width', width).attr('height', height);

var g = svg.append('g');

var path = d3.geoPath().projection(projection);

d3.json('../countries.json', function (error, topology) {
    if (error) throw error;
    // console.log(topology)
    draw(topojson.feature(topology, topology.objects.units).features);
});

function draw(country) {
    g.selectAll('path').data(country).enter().append('path').attr('d', path).attr('stroke', '#fff').attr('fill', '#D8D8D8').attr('class', addClass).on('mouseenter', mouseEnter).on('mouseleave', mouseLeave).on('click', clicked);

    drawPos();
    var p = document.querySelectorAll('.point');
    for (var i = 0; i < p.length; i++) {
        p[i].addEventListener('mouseenter', function (e) {
            console.log(e.pageX, e.pageY);
            bub.style.top = e.clientY - 70 + 'px';
            bub.style.left = e.clientX + 20 + 'px';
        });
    }
}

function mouseEnter(d) {
    if (countries.indexOf(d.properties.name) < 0) {
        return;
    }
    document.querySelector('.pos.' + d.properties.name.replace(' ', '-')).style.display = 'none';
    bub.style.display = 'block';
    bub.querySelector('.country').innerHTML = translation(d.properties.name);
}

function mouseLeave(d) {
    if (countries.indexOf(d.properties.name) < 0) {
        return;
    }
    document.querySelector('.pos.' + d.properties.name.replace(' ', '-')).style.display = 'block';
    bub.style.display = 'none';
}

function addClass(d) {

    if (countries.indexOf(d.properties.name) >= 0) {
        return d.properties.name.replace(' ', '-') + ' ' + 'point';
    }
    return d.properties.name.replace(' ', '-');
}

function clicked(d) {
    if (countries.indexOf(d.properties.name) < 0) {
        return;
    }
    var pos = document.querySelectorAll('.pos');
    var x = void 0,
        y = void 0,
        k = void 0;

    for (var i = 0; i < pos.length; i++) {
        pos[i].style.display = 'none';
    }
    document.querySelector('.bubble').style.display = 'none';
    g.selectAll('path').on('mouseenter', null);
    g.selectAll('path').on('mouseleave', null);

    if (d && centered !== d) {
        var bounds = path.bounds(d);
        var dx = bounds[1][0] - bounds[0][0],
            dy = bounds[1][1] - bounds[0][1];
        x = (bounds[0][0] + bounds[1][0]) / 2;
        y = (bounds[0][1] + bounds[1][1]) / 2;
        k = Math.min(width / dx, height / dy);
        centered = d;
    } else {
        x = width / 2;
        y = height / 2;
        k = 1;
        centered = null;
    }

    g.selectAll('path').classed('active', centered && function (d) {
        return d === centered;
    });

    if (centered !== null) {
        g.selectAll('path').style('stroke-width', 0.75 / k + 'px');
    }

    g.transition().duration(750).attr('transform', 'translate(' + width / 2 + ' ,' + height / 2 + ')scale(' + k + ')translate(' + -x + ',' + -y + ')').on('end', function () {
        // if (centered === null) {
        //     g.selectAll('path')
        //         .style('stroke-width', (0.75 / k) + 'px');
        // }
        document.querySelector('.loading').style.display = 'block';
        document.querySelector('.loading .country').innerHTML = translation(d.properties.name);
        setTimeout(function () {
            location.href = 'bibtwtest.com:4300/list.html';
        }, 400);
    });
}

function drawPos() {
    var Canda = function Canda() {
        var tmp = svg.append('g').attr('class', 'pos Canada').on('click', clickPath);
        tmp.append('image').attr('x', '10%').attr('y', '30%').attr('xlink:href', '../images/map-point.svg');
        tmp.append('text').attr('x', '10.5%').attr('y', '34%').text('加拿大');
    };
    var English = function English() {
        var tmp = svg.append('g').attr('class', 'pos United-Kingdom').on('click', clickPath);
        tmp.append('image').attr('x', '42%').attr('y', '35%').attr('xlink:href', '../images/map-point.svg');
        tmp.append('text').attr('x', '43.5%').attr('y', '39%').text('英國');
    };

    var Thailand = function Thailand() {
        var tmp = svg.append('g').attr('class', 'pos Thailand');
        tmp.append('image').attr('x', '70%').attr('y', '53%').attr('xlink:href', '../images/map-point.svg');
        tmp.append('text').attr('x', '71.5%').attr('y', '57%').text('泰國');
    };

    var HongKong = function HongKong() {
        var tmp = svg.append('g').attr('class', 'pos HongKong').on('click');
        tmp.append('image').attr('x', '70%').attr('y', '53%').attr('xlink:href', '../images/map-point.svg');
        tmp.append('text').attr('x', '71.5%').attr('y', '57%').text('香港');
    };

    Canda();
    English();
    Thailand();
}

function translation(name) {
    switch (name) {
        case 'United Kingdom':
            return '英國';
        case 'France':
            return '法國';
        case 'Canada':
            return '加拿大';
        case 'Thailand':
            return '泰國';
    }
}

// document.querySelector('.pos').addEventListener('click', (e) => {
//     console.log(e.target.classList)
//    // document.querySelector('')
// });

function clickPath(e) {
    console.log(document.querySelector('path.' + this.classList[1]));
    document.querySelector('path.' + this.classList[1]).onclick;
}
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFsbC5qcyJdLCJuYW1lcyI6WyJjb3VudHJpZXMiLCJidWIiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJ3aWR0aCIsImNsaWVudFdpZHRoIiwiaGVpZ2h0IiwiY2xpZW50SGVpZ2h0IiwiY2VudGVyZWQiLCJjbGlja19wb2ludCIsInByb2plY3Rpb24iLCJkMyIsImdlb01lcmNhdG9yIiwic2NhbGUiLCJ0cmFuc2xhdGUiLCJzdmciLCJzZWxlY3QiLCJhcHBlbmQiLCJhdHRyIiwiZyIsInBhdGgiLCJnZW9QYXRoIiwianNvbiIsImVycm9yIiwidG9wb2xvZ3kiLCJkcmF3IiwidG9wb2pzb24iLCJmZWF0dXJlIiwib2JqZWN0cyIsInVuaXRzIiwiZmVhdHVyZXMiLCJjb3VudHJ5Iiwic2VsZWN0QWxsIiwiZGF0YSIsImVudGVyIiwiYWRkQ2xhc3MiLCJvbiIsIm1vdXNlRW50ZXIiLCJtb3VzZUxlYXZlIiwiY2xpY2tlZCIsImRyYXdQb3MiLCJwIiwicXVlcnlTZWxlY3RvckFsbCIsImkiLCJsZW5ndGgiLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsImNvbnNvbGUiLCJsb2ciLCJwYWdlWCIsInBhZ2VZIiwic3R5bGUiLCJ0b3AiLCJjbGllbnRZIiwibGVmdCIsImNsaWVudFgiLCJkIiwiaW5kZXhPZiIsInByb3BlcnRpZXMiLCJuYW1lIiwicmVwbGFjZSIsImRpc3BsYXkiLCJpbm5lckhUTUwiLCJ0cmFuc2xhdGlvbiIsInBvcyIsIngiLCJ5IiwiayIsImJvdW5kcyIsImR4IiwiZHkiLCJNYXRoIiwibWluIiwiY2xhc3NlZCIsInRyYW5zaXRpb24iLCJkdXJhdGlvbiIsInNldFRpbWVvdXQiLCJsb2NhdGlvbiIsImhyZWYiLCJDYW5kYSIsInRtcCIsImNsaWNrUGF0aCIsInRleHQiLCJFbmdsaXNoIiwiVGhhaWxhbmQiLCJIb25nS29uZyIsImNsYXNzTGlzdCIsIm9uY2xpY2siXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBTUEsWUFBWSxDQUFDLGdCQUFE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Q0FBZixDQUFqQyxFQUFvREMsT0FBcEQ7QUFDSCIsImZpbGUiOiJhbGwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBjb3VudHJpZXMgPSBbJ1VuaXRlZCBLaW5nZG9tJywgJ0NhbmFkYScsICdUaGFpbGFuZCddO1xyXG5jb25zdCBidWIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYnViYmxlJyk7XHJcblxyXG5sZXQgd2lkdGggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWFwJykuY2xpZW50V2lkdGgsXHJcbiAgICBoZWlnaHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWFwJykuY2xpZW50SGVpZ2h0LFxyXG4gICAgY2VudGVyZWQsXHJcbiAgICBjbGlja19wb2ludDtcclxuXHJcbmxldCBwcm9qZWN0aW9uID0gZDMuZ2VvTWVyY2F0b3IoKS5zY2FsZSgxOTApXHJcbiAgICAudHJhbnNsYXRlKFt3aWR0aCAvIDIuMiwgaGVpZ2h0IC8gMS40XSk7XHJcblxyXG5sZXQgc3ZnID0gZDMuc2VsZWN0KCcubWFwJykuYXBwZW5kKCdzdmcnKVxyXG4gICAgLmF0dHIoJ3dpZHRoJywgd2lkdGgpXHJcbiAgICAuYXR0cignaGVpZ2h0JywgaGVpZ2h0KTtcclxuXHJcbmxldCBnID0gc3ZnLmFwcGVuZCgnZycpO1xyXG5cclxubGV0IHBhdGggPSBkMy5nZW9QYXRoKClcclxuICAgIC5wcm9qZWN0aW9uKHByb2plY3Rpb24pO1xyXG5cclxuZDMuanNvbignLi4vY291bnRyaWVzLmpzb24nLCBmdW5jdGlvbihlcnJvciwgdG9wb2xvZ3kpIHtcclxuICAgIGlmIChlcnJvcikgdGhyb3cgZXJyb3I7XHJcbiAgICAvLyBjb25zb2xlLmxvZyh0b3BvbG9neSlcclxuICAgIGRyYXcodG9wb2pzb24uZmVhdHVyZSh0b3BvbG9neSwgdG9wb2xvZ3kub2JqZWN0cy51bml0cylcclxuICAgICAgICAuZmVhdHVyZXMpO1xyXG5cclxufSk7XHJcblxyXG5mdW5jdGlvbiBkcmF3KGNvdW50cnkpIHtcclxuICAgIGcuc2VsZWN0QWxsKCdwYXRoJylcclxuICAgICAgICAuZGF0YShjb3VudHJ5KVxyXG4gICAgICAgIC5lbnRlcigpXHJcbiAgICAgICAgLmFwcGVuZCgncGF0aCcpXHJcbiAgICAgICAgLmF0dHIoJ2QnLCBwYXRoKVxyXG4gICAgICAgIC5hdHRyKCdzdHJva2UnLCAnI2ZmZicpXHJcbiAgICAgICAgLmF0dHIoJ2ZpbGwnLCAnI0Q4RDhEOCcpXHJcbiAgICAgICAgLmF0dHIoJ2NsYXNzJywgYWRkQ2xhc3MpXHJcbiAgICAgICAgLm9uKCdtb3VzZWVudGVyJywgbW91c2VFbnRlcilcclxuICAgICAgICAub24oJ21vdXNlbGVhdmUnLCBtb3VzZUxlYXZlKVxyXG4gICAgICAgIC5vbignY2xpY2snLCBjbGlja2VkKTtcclxuXHJcbiAgICBkcmF3UG9zKCk7XHJcbiAgICBsZXQgcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wb2ludCcpO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgcFtpXS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgKGUpID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZS5wYWdlWCwgZS5wYWdlWSk7XHJcbiAgICAgICAgICAgIGJ1Yi5zdHlsZS50b3AgPSBlLmNsaWVudFkgIC0gNzAgKyAncHgnO1xyXG4gICAgICAgICAgICBidWIuc3R5bGUubGVmdCA9IGUuY2xpZW50WCArIDIwICsgJ3B4JztcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxufVxyXG5cclxuXHJcbmZ1bmN0aW9uIG1vdXNlRW50ZXIoZCkge1xyXG4gICAgaWYgKGNvdW50cmllcy5pbmRleE9mKGQucHJvcGVydGllcy5uYW1lKSA8IDApIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucG9zLicgKyBkLnByb3BlcnRpZXMubmFtZS5yZXBsYWNlKCcgJywgJy0nKSkuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgIGJ1Yi5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICAgIGJ1Yi5xdWVyeVNlbGVjdG9yKCcuY291bnRyeScpLmlubmVySFRNTCA9IHRyYW5zbGF0aW9uKGQucHJvcGVydGllcy5uYW1lKTtcclxuXHJcbn1cclxuXHJcblxyXG5mdW5jdGlvbiBtb3VzZUxlYXZlKGQpIHtcclxuICAgIGlmIChjb3VudHJpZXMuaW5kZXhPZihkLnByb3BlcnRpZXMubmFtZSkgPCAwKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBvcy4nICsgZC5wcm9wZXJ0aWVzLm5hbWUucmVwbGFjZSgnICcsICctJykpLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgYnViLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFkZENsYXNzKGQpIHtcclxuXHJcbiAgICBpZiAoY291bnRyaWVzLmluZGV4T2YoZC5wcm9wZXJ0aWVzLm5hbWUpID49IDApIHtcclxuICAgICAgICByZXR1cm4gZC5wcm9wZXJ0aWVzLm5hbWUucmVwbGFjZSgnICcsICctJykgKyAnICcgKyAncG9pbnQnO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGQucHJvcGVydGllcy5uYW1lLnJlcGxhY2UoJyAnLCAnLScpXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNsaWNrZWQoZCkge1xyXG4gICAgaWYgKGNvdW50cmllcy5pbmRleE9mKGQucHJvcGVydGllcy5uYW1lKSA8IDApIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBsZXQgcG9zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnBvcycpO1xyXG4gICAgbGV0IHgsIHksIGs7XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwb3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBwb3NbaV0uc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgIH1cclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5idWJibGUnKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgZy5zZWxlY3RBbGwoJ3BhdGgnKS5vbignbW91c2VlbnRlcicsIG51bGwpO1xyXG4gICAgZy5zZWxlY3RBbGwoJ3BhdGgnKS5vbignbW91c2VsZWF2ZScsIG51bGwpO1xyXG5cclxuICAgIGlmICgoZCAmJiBjZW50ZXJlZCAhPT0gZCkpIHtcclxuICAgICAgICBsZXQgYm91bmRzID0gcGF0aC5ib3VuZHMoZCk7XHJcbiAgICAgICAgbGV0IGR4ID0gYm91bmRzWzFdWzBdIC0gYm91bmRzWzBdWzBdLFxyXG4gICAgICAgICAgICBkeSA9IGJvdW5kc1sxXVsxXSAtIGJvdW5kc1swXVsxXTtcclxuICAgICAgICB4ID0gKGJvdW5kc1swXVswXSArIGJvdW5kc1sxXVswXSkgLyAyO1xyXG4gICAgICAgIHkgPSAoYm91bmRzWzBdWzFdICsgYm91bmRzWzFdWzFdKSAvIDI7XHJcbiAgICAgICAgayA9IE1hdGgubWluKHdpZHRoIC8gZHgsIGhlaWdodCAvIGR5KTtcclxuICAgICAgICBjZW50ZXJlZCA9IGQ7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHggPSB3aWR0aCAvIDI7XHJcbiAgICAgICAgeSA9IGhlaWdodCAvIDI7XHJcbiAgICAgICAgayA9IDE7XHJcbiAgICAgICAgY2VudGVyZWQgPSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGcuc2VsZWN0QWxsKCdwYXRoJylcclxuICAgICAgICAuY2xhc3NlZCgnYWN0aXZlJywgY2VudGVyZWQgJiYgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGQgPT09IGNlbnRlcmVkO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICBpZiAoY2VudGVyZWQgIT09IG51bGwpIHtcclxuICAgICAgICBnLnNlbGVjdEFsbCgncGF0aCcpXHJcbiAgICAgICAgICAgIC5zdHlsZSgnc3Ryb2tlLXdpZHRoJywgKDAuNzUgLyBrKSArICdweCcpO1xyXG4gICAgfVxyXG5cclxuICAgIGcudHJhbnNpdGlvbigpXHJcbiAgICAgICAgLmR1cmF0aW9uKDc1MClcclxuICAgICAgICAuYXR0cigndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZSgnICsgd2lkdGggLyAyICsgJyAsJyArIGhlaWdodCAvIDIgKyAnKXNjYWxlKCcgKyBrICsgJyl0cmFuc2xhdGUoJyArIC14ICsgJywnICsgLXkgKyAnKScpXHJcbiAgICAgICAgLm9uKCdlbmQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgLy8gaWYgKGNlbnRlcmVkID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgIC8vICAgICBnLnNlbGVjdEFsbCgncGF0aCcpXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgLnN0eWxlKCdzdHJva2Utd2lkdGgnLCAoMC43NSAvIGspICsgJ3B4Jyk7XHJcbiAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxvYWRpbmcnKS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxvYWRpbmcgLmNvdW50cnknKS5pbm5lckhUTUwgPSB0cmFuc2xhdGlvbihkLnByb3BlcnRpZXMubmFtZSk7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBsb2NhdGlvbi5ocmVmID0gJ2JpYnR3dGVzdC5jb206NDMwMC9saXN0Lmh0bWwnXHJcbiAgICAgICAgICAgIH0sIDQwMClcclxuXHJcbiAgICAgICAgfSk7XHJcbn1cclxuXHJcblxyXG5mdW5jdGlvbiBkcmF3UG9zKCkge1xyXG4gICAgbGV0IENhbmRhID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgbGV0IHRtcCA9IHN2Zy5hcHBlbmQoJ2cnKVxyXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAncG9zIENhbmFkYScpXHJcbiAgICAgICAgICAgIC5vbignY2xpY2snLCBjbGlja1BhdGgpO1xyXG4gICAgICAgIHRtcC5hcHBlbmQoJ2ltYWdlJylcclxuICAgICAgICAgICAgLmF0dHIoJ3gnLCAnMTAlJylcclxuICAgICAgICAgICAgLmF0dHIoJ3knLCAnMzAlJylcclxuICAgICAgICAgICAgLmF0dHIoJ3hsaW5rOmhyZWYnLCAnLi4vaW1hZ2VzL21hcC1wb2ludC5zdmcnKTtcclxuICAgICAgICB0bXAuYXBwZW5kKCd0ZXh0JylcclxuICAgICAgICAgICAgLmF0dHIoJ3gnLCAnMTAuNSUnKVxyXG4gICAgICAgICAgICAuYXR0cigneScsICczNCUnKVxyXG4gICAgICAgICAgICAudGV4dCgn5Yqg5ou/5aSnJylcclxuICAgIH07XHJcbiAgICBsZXQgRW5nbGlzaCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGxldCB0bXAgPSBzdmcuYXBwZW5kKCdnJylcclxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3BvcyBVbml0ZWQtS2luZ2RvbScpXHJcbiAgICAgICAgICAgIC5vbignY2xpY2snLCBjbGlja1BhdGgpO1xyXG4gICAgICAgIHRtcC5hcHBlbmQoJ2ltYWdlJylcclxuICAgICAgICAgICAgLmF0dHIoJ3gnLCAnNDIlJylcclxuICAgICAgICAgICAgLmF0dHIoJ3knLCAnMzUlJylcclxuICAgICAgICAgICAgLmF0dHIoJ3hsaW5rOmhyZWYnLCAnLi4vaW1hZ2VzL21hcC1wb2ludC5zdmcnKTtcclxuICAgICAgICB0bXAuYXBwZW5kKCd0ZXh0JylcclxuICAgICAgICAgICAgLmF0dHIoJ3gnLCAnNDMuNSUnKVxyXG4gICAgICAgICAgICAuYXR0cigneScsICczOSUnKVxyXG4gICAgICAgICAgICAudGV4dCgn6Iux5ZyLJylcclxuICAgIH07XHJcblxyXG4gICAgbGV0IFRoYWlsYW5kID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgbGV0IHRtcCA9IHN2Zy5hcHBlbmQoJ2cnKVxyXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAncG9zIFRoYWlsYW5kJyk7XHJcbiAgICAgICAgdG1wLmFwcGVuZCgnaW1hZ2UnKVxyXG4gICAgICAgICAgICAuYXR0cigneCcsICc3MCUnKVxyXG4gICAgICAgICAgICAuYXR0cigneScsICc1MyUnKVxyXG4gICAgICAgICAgICAuYXR0cigneGxpbms6aHJlZicsICcuLi9pbWFnZXMvbWFwLXBvaW50LnN2ZycpO1xyXG4gICAgICAgIHRtcC5hcHBlbmQoJ3RleHQnKVxyXG4gICAgICAgICAgICAuYXR0cigneCcsICc3MS41JScpXHJcbiAgICAgICAgICAgIC5hdHRyKCd5JywgJzU3JScpXHJcbiAgICAgICAgICAgIC50ZXh0KCfms7DlnIsnKVxyXG4gICAgfTtcclxuXHJcbiAgICBsZXQgSG9uZ0tvbmcgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBsZXQgdG1wID0gc3ZnLmFwcGVuZCgnZycpXHJcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdwb3MgSG9uZ0tvbmcnKVxyXG4gICAgICAgICAgICAub24oJ2NsaWNrJyk7XHJcbiAgICAgICAgdG1wLmFwcGVuZCgnaW1hZ2UnKVxyXG4gICAgICAgICAgICAuYXR0cigneCcsICc3MCUnKVxyXG4gICAgICAgICAgICAuYXR0cigneScsICc1MyUnKVxyXG4gICAgICAgICAgICAuYXR0cigneGxpbms6aHJlZicsICcuLi9pbWFnZXMvbWFwLXBvaW50LnN2ZycpO1xyXG4gICAgICAgIHRtcC5hcHBlbmQoJ3RleHQnKVxyXG4gICAgICAgICAgICAuYXR0cigneCcsICc3MS41JScpXHJcbiAgICAgICAgICAgIC5hdHRyKCd5JywgJzU3JScpXHJcbiAgICAgICAgICAgIC50ZXh0KCfpppnmuK8nKVxyXG4gICAgfTtcclxuXHJcblxyXG4gICAgQ2FuZGEoKTtcclxuICAgIEVuZ2xpc2goKTtcclxuICAgIFRoYWlsYW5kKCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHRyYW5zbGF0aW9uKG5hbWUpIHtcclxuICAgIHN3aXRjaCAobmFtZSkge1xyXG4gICAgICAgIGNhc2UgJ1VuaXRlZCBLaW5nZG9tJzpcclxuICAgICAgICAgICAgcmV0dXJuICfoi7HlnIsnO1xyXG4gICAgICAgIGNhc2UgJ0ZyYW5jZSc6XHJcbiAgICAgICAgICAgIHJldHVybiAn5rOV5ZyLJztcclxuICAgICAgICBjYXNlICdDYW5hZGEnOlxyXG4gICAgICAgICAgICByZXR1cm4gJ+WKoOaLv+Wkpyc7XHJcbiAgICAgICAgY2FzZSAnVGhhaWxhbmQnOlxyXG4gICAgICAgICAgICByZXR1cm4gJ+azsOWciyc7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8vIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wb3MnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbi8vICAgICBjb25zb2xlLmxvZyhlLnRhcmdldC5jbGFzc0xpc3QpXHJcbi8vICAgIC8vIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJycpXHJcbi8vIH0pO1xyXG5cclxuZnVuY3Rpb24gY2xpY2tQYXRoKGUpIHtcclxuICAgIGNvbnNvbGUubG9nKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ3BhdGguJyArIHRoaXMuY2xhc3NMaXN0WzFdKSlcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ3BhdGguJyArIHRoaXMuY2xhc3NMaXN0WzFdKS5vbmNsaWNrO1xyXG59XHJcblxyXG5cclxuXHJcblxyXG4iXX0=
