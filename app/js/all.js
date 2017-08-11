const countries = ['United Kingdom', 'Canada', 'Thailand'];
const bub = document.querySelector('.bubble');

let width = document.querySelector('.map').clientWidth,
    height = document.querySelector('.map').clientHeight,
    centered,
    click_point;

let projection = d3.geoMercator().scale(190)
    .translate([width / 2.2, height / 1.4]);

let svg = d3.select('.map').append('svg')
    .attr('width', width)
    .attr('height', height);

let g = svg.append('g');

let path = d3.geoPath()
    .projection(projection);

d3.json('../countries.json', function(error, topology) {
    if (error) throw error;
    // console.log(topology)
    draw(topojson.feature(topology, topology.objects.units)
        .features);

});

function draw(country) {
    g.selectAll('path')
        .data(country)
        .enter()
        .append('path')
        .attr('d', path)
        .attr('stroke', '#fff')
        .attr('fill', '#D8D8D8')
        .attr('class', addClass)
        .on('mouseenter', mouseEnter)
        .on('mouseleave', mouseLeave)
        .on('click', clicked);

    drawPos();
    let p = document.querySelectorAll('.point');
    for (let i = 0; i < p.length; i++) {
        p[i].addEventListener('mouseenter', (e) => {
            console.log(e.pageX, e.pageY);
            bub.style.top = e.clientY  - 70 + 'px';
            bub.style.left = e.clientX + 20 + 'px';
        })
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
    return d.properties.name.replace(' ', '-')
}

function clicked(d) {
    if (countries.indexOf(d.properties.name) < 0) {
        return;
    }
    let pos = document.querySelectorAll('.pos');
    let x, y, k;

    for (let i = 0; i < pos.length; i++) {
        pos[i].style.display = 'none';
    }
    document.querySelector('.bubble').style.display = 'none';
    g.selectAll('path').on('mouseenter', null);
    g.selectAll('path').on('mouseleave', null);

    if ((d && centered !== d)) {
        let bounds = path.bounds(d);
        let dx = bounds[1][0] - bounds[0][0],
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

    g.selectAll('path')
        .classed('active', centered && function(d) {
                return d === centered;
            });

    if (centered !== null) {
        g.selectAll('path')
            .style('stroke-width', (0.75 / k) + 'px');
    }

    g.transition()
        .duration(750)
        .attr('transform', 'translate(' + width / 2 + ' ,' + height / 2 + ')scale(' + k + ')translate(' + -x + ',' + -y + ')')
        .on('end', function() {
            // if (centered === null) {
            //     g.selectAll('path')
            //         .style('stroke-width', (0.75 / k) + 'px');
            // }
            document.querySelector('.loading').style.display = 'block';
            document.querySelector('.loading .country').innerHTML = translation(d.properties.name);
            setTimeout(function() {
                location.href = 'https://google.com'
            }, 400)

        });
}


function drawPos() {
    let Canda = function() {
        let tmp = svg.append('g')
            .attr('class', 'pos Canada')
            .on('click', clickPath);
        tmp.append('image')
            .attr('x', '10%')
            .attr('y', '30%')
            .attr('xlink:href', '../images/map-point.svg');
        tmp.append('text')
            .attr('x', '10.5%')
            .attr('y', '34%')
            .text('加拿大')
    };
    let English = function() {
        let tmp = svg.append('g')
            .attr('class', 'pos United-Kingdom')
            .on('click', clickPath);
        tmp.append('image')
            .attr('x', '42%')
            .attr('y', '35%')
            .attr('xlink:href', '../images/map-point.svg');
        tmp.append('text')
            .attr('x', '43.5%')
            .attr('y', '39%')
            .text('英國')
    };

    let Thailand = function() {
        let tmp = svg.append('g')
            .attr('class', 'pos Thailand');
        tmp.append('image')
            .attr('x', '70%')
            .attr('y', '53%')
            .attr('xlink:href', '../images/map-point.svg');
        tmp.append('text')
            .attr('x', '71.5%')
            .attr('y', '57%')
            .text('泰國')
    };

    let HongKong = function() {
        let tmp = svg.append('g')
            .attr('class', 'pos HongKong')
            .on('click');
        tmp.append('image')
            .attr('x', '70%')
            .attr('y', '53%')
            .attr('xlink:href', '../images/map-point.svg');
        tmp.append('text')
            .attr('x', '71.5%')
            .attr('y', '57%')
            .text('香港')
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



function clickPath(e) {
    console.log(document.querySelector('path.' + this.classList[1]))
    document.querySelector('path.' + this.classList[1]).onclick;
}




