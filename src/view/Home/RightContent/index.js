import React from "react";
import Box from "@mui/material/Box";
import { Card } from "@mui/material";
import Map from "./Map";
// import MapboxGeocoder from "react-map-gl-geocoder";
// import axios from "axios"
// import * as posts from '../../../_test/posts.json';

function LeftContent() {
  // useEffect(()=> {
  //   // axios.get("https://shielded-sands-12116.herokuapp.com/api")
  //   // .then(res=> {
  //   //   console.log(res)
  //   //   posts = res.data.posts;
  //   // })
  //   const posts = [
  //     {
  //         "properties": {
  //             "description": "<strong><a href=\"/posts/61b2db38ded45d9e3d57bab1\">architecto</a></strong><p>Dallas, Texas</p><p>Sed sunt aut volupta...</p>"
  //         },
  //         "_id": "61b2db38ded45d9e3d57bab1",
  //         "title": "architecto",
  //         "price": 8,
  //         "description": "Sed sunt aut voluptatibus esse.\nRem et sed et et officia dolorum ut beatae voluptate.\nOfficia corporis corrupti omnis ut magni.\nEos quibusdam maiores sunt.\nDicta neque dicta facere vel quisquam nobis.",
  //         "images": [
  //             {
  //                 "path": "https://baoninhbinh.org.vn//DATA/ARTICLES/2021/5/17/cuoc-dua-lot-vao-top-100-anh-dep-di-san-van-hoa-va-thien-7edf3.jpg",
  //                 "_id": "61b2db38ded45d9e3d57bab2"
  //             }
  //         ],
  //         "location": "Dallas, Texas",
  //         "geometry": {
  //             "type": "Point",
  //             "coordinates": [
  //                 -96.79698789999999,
  //                 32.7766642
  //             ],
  //             "_id": "61b2db38ded45d9e3d57bab3"
  //         },
  //         "author": "61b2d9caa74b4f0de843a7ca",
  //         "reviews": [
  //             "61b2db38ded45d9e3d57baaf"
  //         ],
  //         "__v": 0
  //     },
  //     {
  //         "properties": {
  //             "description": "<strong><a href=\"/posts/61b2db38ded45d9e3d57bab8\">voluptatum</a></strong><p>Chelsea, Massachusetts</p><p>Voluptas minima simi...</p>"
  //         },
  //         "_id": "61b2db38ded45d9e3d57bab8",
  //         "title": "voluptatum",
  //         "price": 975,
  //         "description": "Voluptas minima similique asperiores magni sint quia sed pariatur in. Qui voluptate provident eius. Impedit animi dolore voluptas voluptatem aut voluptate qui. Ut dignissimos est id vel reprehenderit voluptates facilis quis voluptas. Commodi praesentium qui quam laborum. Excepturi earum placeat voluptate animi iure.",
  //         "images": [
  //             {
  //                 "path": "https://picsum.photos/200/300",
  //                 "_id": "61b2db38ded45d9e3d57bab9"
  //             }
  //         ],
  //         "location": "Chelsea, Massachusetts",
  //         "geometry": {
  //             "type": "Point",
  //             "coordinates": [
  //                 -71.0328284,
  //                 42.3917638
  //             ],
  //             "_id": "61b2db38ded45d9e3d57baba"
  //         },
  //         "author": "61b2d9caa74b4f0de843a7ca",
  //         "reviews": [
  //             "61b2db38ded45d9e3d57bab6"
  //         ],
  //         "__v": 0
  //     },
  //     {
  //         "properties": {
  //             "description": "<strong><a href=\"/posts/61b2db38ded45d9e3d57babf\">architecto</a></strong><p>Westfield, Massachusetts</p><p>molestiae necessitat...</p>"
  //         },
  //         "_id": "61b2db38ded45d9e3d57babf",
  //         "title": "architecto",
  //         "price": 885,
  //         "description": "molestiae necessitatibus ea",
  //         "images": [
  //             {
  //                 "path": "https://baoninhbinh.org.vn//DATA/ARTICLES/2021/5/17/cuoc-dua-lot-vao-top-100-anh-dep-di-san-van-hoa-va-thien-7edf3.jpg",
  //                 "_id": "61b2db38ded45d9e3d57bac0"
  //             }
  //         ],
  //         "location": "Westfield, Massachusetts",
  //         "geometry": {
  //             "type": "Point",
  //             "coordinates": [
  //                 -72.749538,
  //                 42.1250929
  //             ],
  //             "_id": "61b2db38ded45d9e3d57bac1"
  //         },
  //         "author": "61b2d9caa74b4f0de843a7ca",
  //         "reviews": [
  //             "61b2db38ded45d9e3d57babd"
  //         ],
  //         "__v": 0
  //     },
  //     {
  //         "properties": {
  //             "description": "<strong><a href=\"/posts/61b2db38ded45d9e3d57bac6\">laboriosam</a></strong><p>Rockford, Illinois</p><p>Adipisci velit amet ...</p>"
  //         },
  //         "_id": "61b2db38ded45d9e3d57bac6",
  //         "title": "laboriosam",
  //         "price": 163,
  //         "description": "Adipisci velit amet et rerum autem nihil quo. Et sit incidunt ut vero reiciendis omnis. In sit quia dolorum est ipsum a beatae et alias. Quibusdam autem distinctio accusantium.",
  //         "images": [
  //             {
  //                 "path": "https://baoninhbinh.org.vn//DATA/ARTICLES/2021/5/17/cuoc-dua-lot-vao-top-100-anh-dep-di-san-van-hoa-va-thien-7edf3.jpg",
  //                 "_id": "61b2db38ded45d9e3d57bac7"
  //             }
  //         ],
  //         "location": "Rockford, Illinois",
  //         "geometry": {
  //             "type": "Point",
  //             "coordinates": [
  //                 -89.0939952,
  //                 42.2711311
  //             ],
  //             "_id": "61b2db38ded45d9e3d57bac8"
  //         },
  //         "author": "61b2d9caa74b4f0de843a7ca",
  //         "reviews": [
  //             "61b2db38ded45d9e3d57bac4"
  //         ],
  //         "__v": 0
  //     },
  //     {
  //         "properties": {
  //             "description": "<strong><a href=\"/posts/61b2db38ded45d9e3d57bacd\">voluptatem</a></strong><p>Keller, Texas</p><p>Id perspiciatis quis...</p>"
  //         },
  //         "_id": "61b2db38ded45d9e3d57bacd",
  //         "title": "voluptatem",
  //         "price": 859,
  //         "description": "Id perspiciatis quisquam voluptatum libero cupiditate aliquid distinctio. Commodi totam voluptate rerum aliquam vero et recusandae cumque. Est velit soluta deserunt. Mollitia minima minima itaque quod dicta velit aspernatur. Nesciunt dolores et voluptate eligendi consequatur laudantium possimus.",
  //         "images": [
  //             {
  //                 "path": "https://baoninhbinh.org.vn//DATA/ARTICLES/2021/5/17/cuoc-dua-lot-vao-top-100-anh-dep-di-san-van-hoa-va-thien-7edf3.jpg",
  //                 "_id": "61b2db38ded45d9e3d57bace"
  //             }
  //         ],
  //         "location": "Keller, Texas",
  //         "geometry": {
  //             "type": "Point",
  //             "coordinates": [
  //                 -97.229298,
  //                 32.9341893
  //             ],
  //             "_id": "61b2db38ded45d9e3d57bacf"
  //         },
  //         "author": "61b2d9caa74b4f0de843a7ca",
  //         "reviews": [
  //             "61b2db38ded45d9e3d57bacb"
  //         ],
  //         "__v": 0
  //     },
  //     {
  //         "properties": {
  //             "description": "<strong><a href=\"/posts/61b2db39ded45d9e3d57bad4\">reiciendis</a></strong><p>West Allis, Wisconsin</p><p>Consequatur laborios...</p>"
  //         },
  //         "_id": "61b2db39ded45d9e3d57bad4",
  //         "title": "reiciendis",
  //         "price": 581,
  //         "description": "Consequatur laboriosam quia quia repellendus sunt earum nobis qui. Ducimus expedita aut neque laudantium atque temporibus. Assumenda vitae repellat. Delectus suscipit tenetur ea maxime eligendi et. Quis maiores recusandae eum qui necessitatibus nulla. Qui omnis earum accusantium quisquam.\n \rCulpa aliquam nihil autem sint laborum. Illum a quis accusantium. Doloremque et laboriosam cum dignissimos. Maiores asperiores qui.\n \rIpsa aspernatur unde occaecati modi. Laborum quis maxime. Corrupti ducimus commodi officiis quaerat suscipit libero laborum sunt. Sit ut pariatur eligendi voluptatem consequuntur ullam. Culpa nam commodi cumque debitis.",
  //         "images": [
  //             {
  //                 "path": "https://baoninhbinh.org.vn//DATA/ARTICLES/2021/5/17/cuoc-dua-lot-vao-top-100-anh-dep-di-san-van-hoa-va-thien-7edf3.jpg",
  //                 "_id": "61b2db39ded45d9e3d57bad5"
  //             }
  //         ],
  //         "location": "West Allis, Wisconsin",
  //         "geometry": {
  //             "type": "Point",
  //             "coordinates": [
  //                 -88.0070315,
  //                 43.0166806
  //             ],
  //             "_id": "61b2db39ded45d9e3d57bad6"
  //         },
  //         "author": "61b2d9caa74b4f0de843a7ca",
  //         "reviews": [
  //             "61b2db39ded45d9e3d57bad2"
  //         ],
  //         "__v": 0
  //     },
  //     {
  //         "properties": {
  //             "description": "<strong><a href=\"/posts/61b2db39ded45d9e3d57badb\">voluptatem</a></strong><p>Oro Valley, Arizona</p><p>Dolor est non commod...</p>"
  //         },
  //         "_id": "61b2db39ded45d9e3d57badb",
  //         "title": "voluptatem",
  //         "price": 882,
  //         "description": "Dolor est non commodi velit sit tenetur optio. Eveniet qui sit qui autem necessitatibus. Quam sed dolore. Reprehenderit non ut nobis corrupti veniam quod.",
  //         "images": [
  //             {
  //                 "path": "https://baoninhbinh.org.vn//DATA/ARTICLES/2021/5/17/cuoc-dua-lot-vao-top-100-anh-dep-di-san-van-hoa-va-thien-7edf3.jpg",
  //                 "_id": "61b2db39ded45d9e3d57badc"
  //             }
  //         ],
  //         "location": "Oro Valley, Arizona",
  //         "geometry": {
  //             "type": "Point",
  //             "coordinates": [
  //                 -110.966488,
  //                 32.3909071
  //             ],
  //             "_id": "61b2db39ded45d9e3d57badd"
  //         },
  //         "author": "61b2d9caa74b4f0de843a7ca",
  //         "reviews": [
  //             "61b2db39ded45d9e3d57bad9"
  //         ],
  //         "__v": 0
  //     },
  //     {
  //         "properties": {
  //             "description": "<strong><a href=\"/posts/61b2db39ded45d9e3d57bae2\">temporibus</a></strong><p>Turlock, California</p><p>voluptatum...</p>"
  //         },
  //         "_id": "61b2db39ded45d9e3d57bae2",
  //         "title": "temporibus",
  //         "price": 481,
  //         "description": "voluptatum",
  //         "images": [
  //             {
  //                 "path": "https://baoninhbinh.org.vn//DATA/ARTICLES/2021/5/17/cuoc-dua-lot-vao-top-100-anh-dep-di-san-van-hoa-va-thien-7edf3.jpg",
  //                 "_id": "61b2db39ded45d9e3d57bae3"
  //             }
  //         ],
  //         "location": "Turlock, California",
  //         "geometry": {
  //             "type": "Point",
  //             "coordinates": [
  //                 -120.8465941,
  //                 37.4946568
  //             ],
  //             "_id": "61b2db39ded45d9e3d57bae4"
  //         },
  //         "author": "61b2d9caa74b4f0de843a7ca",
  //         "reviews": [
  //             "61b2db39ded45d9e3d57bae0"
  //         ],
  //         "__v": 0
  //     },
  //     {
  //         "properties": {
  //             "description": "<strong><a href=\"/posts/61b2db39ded45d9e3d57bae9\">voluptatem</a></strong><p>Minneapolis, Minnesota</p><p>Quidem mollitia quia...</p>"
  //         },
  //         "_id": "61b2db39ded45d9e3d57bae9",
  //         "title": "voluptatem",
  //         "price": 45,
  //         "description": "Quidem mollitia quia omnis. Libero ea molestiae sed qui id placeat recusandae inventore qui. Aperiam nihil voluptas. Rem voluptate est praesentium veritatis. Dolor accusamus sunt illo adipisci aut quo voluptatem et.\n \rNon error deserunt velit ut qui autem ipsum impedit. Deleniti mollitia non. Velit quisquam deleniti. Sit beatae voluptatem cumque nobis sapiente. Esse quae molestiae aut. Nemo alias eum quis voluptatem praesentium.\n \rVoluptatem sed cupiditate quia quaerat dolorum quod. Voluptate temporibus numquam repellat ipsam nobis alias. Sit tempore libero consectetur ratione. Sit repudiandae at quis sit asperiores. Est ducimus sint qui doloribus quaerat ex ducimus.",
  //         "images": [
  //             {
  //                 "path": "https://baoninhbinh.org.vn//DATA/ARTICLES/2021/5/17/cuoc-dua-lot-vao-top-100-anh-dep-di-san-van-hoa-va-thien-7edf3.jpg",
  //                 "_id": "61b2db39ded45d9e3d57baea"
  //             }
  //         ],
  //         "location": "Minneapolis, Minnesota",
  //         "geometry": {
  //             "type": "Point",
  //             "coordinates": [
  //                 -93.2650108,
  //                 44.977753
  //             ],
  //             "_id": "61b2db39ded45d9e3d57baeb"
  //         },
  //         "author": "61b2d9caa74b4f0de843a7ca",
  //         "reviews": [
  //             "61b2db39ded45d9e3d57bae7"
  //         ],
  //         "__v": 0
  //     },
  //     {
  //         "properties": {
  //             "description": "<strong><a href=\"/posts/61b2db39ded45d9e3d57baf0\">laudantium</a></strong><p>Marysville, Washington</p><p>Beatae autem molesti...</p>"
  //         },
  //         "_id": "61b2db39ded45d9e3d57baf0",
  //         "title": "laudantium",
  //         "price": 551,
  //         "description": "Beatae autem molestias pariatur consequatur ipsum optio dolorem voluptas culpa. Officiis aliquid modi dignissimos quisquam in. Cupiditate laudantium aut maxime.",
  //         "images": [
  //             {
  //                 "path": "https://baoninhbinh.org.vn//DATA/ARTICLES/2021/5/17/cuoc-dua-lot-vao-top-100-anh-dep-di-san-van-hoa-va-thien-7edf3.jpg",
  //                 "_id": "61b2db39ded45d9e3d57baf1"
  //             }
  //         ],
  //         "location": "Marysville, Washington",
  //         "geometry": {
  //             "type": "Point",
  //             "coordinates": [
  //                 -122.1770818,
  //                 48.0517637
  //             ],
  //             "_id": "61b2db39ded45d9e3d57baf2"
  //         },
  //         "author": "61b2d9caa74b4f0de843a7ca",
  //         "reviews": [
  //             "61b2db39ded45d9e3d57baee"
  //         ],
  //         "__v": 0
  //     },
  //     {
  //         "properties": {
  //             "description": "<strong><a href=\"/posts/61b2db39ded45d9e3d57baf7\">voluptatem</a></strong><p>Somerville, Massachusetts</p><p>Doloremque neque et....</p>"
  //         },
  //         "_id": "61b2db39ded45d9e3d57baf7",
  //         "title": "voluptatem",
  //         "price": 413,
  //         "description": "Doloremque neque et. Accusamus ipsum suscipit aliquam ut et voluptatem tempora. Atque odit quis consequatur est reprehenderit et. Dolor enim est molestiae numquam velit deleniti aut quaerat voluptatem. Cupiditate quod eligendi non et ullam voluptatem.",
  //         "images": [
  //             {
  //                 "path": "https://baoninhbinh.org.vn//DATA/ARTICLES/2021/5/17/cuoc-dua-lot-vao-top-100-anh-dep-di-san-van-hoa-va-thien-7edf3.jpg",
  //                 "_id": "61b2db39ded45d9e3d57baf8"
  //             }
  //         ],
  //         "location": "Somerville, Massachusetts",
  //         "geometry": {
  //             "type": "Point",
  //             "coordinates": [
  //                 -71.0994968,
  //                 42.3875968
  //             ],
  //             "_id": "61b2db39ded45d9e3d57baf9"
  //         },
  //         "author": "61b2d9caa74b4f0de843a7ca",
  //         "reviews": [
  //             "61b2db39ded45d9e3d57baf5"
  //         ],
  //         "__v": 0
  //     },
  //     {
  //         "properties": {
  //             "description": "<strong><a href=\"/posts/61b2db39ded45d9e3d57bafe\">architecto</a></strong><p>Simi Valley, California</p><p>Doloremque rerum qui...</p>"
  //         },
  //         "_id": "61b2db39ded45d9e3d57bafe",
  //         "title": "architecto",
  //         "price": 209,
  //         "description": "Doloremque rerum qui qui qui asperiores ut.\nItaque sed blanditiis ullam impedit aut nostrum temporibus nesciunt alias.\nCulpa est nam.\nEsse ut accusamus a temporibus voluptatem.",
  //         "images": [
  //             {
  //                 "path": "https://baoninhbinh.org.vn//DATA/ARTICLES/2021/5/17/cuoc-dua-lot-vao-top-100-anh-dep-di-san-van-hoa-va-thien-7edf3.jpg",
  //                 "_id": "61b2db39ded45d9e3d57baff"
  //             }
  //         ],
  //         "location": "Simi Valley, California",
  //         "geometry": {
  //             "type": "Point",
  //             "coordinates": [
  //                 -118.781482,
  //                 34.2694474
  //             ],
  //             "_id": "61b2db39ded45d9e3d57bb00"
  //         },
  //         "author": "61b2d9caa74b4f0de843a7ca",
  //         "reviews": [
  //             "61b2db39ded45d9e3d57bafc"
  //         ],
  //         "__v": 0
  //     }
  // ]
  //   console.log(posts)
  //   var location_auto;
  //   var map = new mapboxgl.Map({
  //     container: 'map',
  //     style: 'mapbox://styles/mapbox/light-v9',
  //     center: [-98.55562, 39.809734], // center of map
  //     zoom: 3.3
  //   });
  
  //   if(location_auto) {
  //       map.setCenter([location_auto[0],location_auto[1]]);
  //       map.setZoom(7.5);
  //   }
    
  //   // map.addControl(new MapboxGeocoder({ // add search capability in map - need for mapBoxToken
  //   //     accessToken: "pk.eyJ1IjoiYnctZmxvdzA5IiwiYSI6ImNrc2p5N3B5cDA5YmkycG51ejZuYnFmY2QifQ.J9TQZlei1Jqg8R9Mn8zNmQ"
  //   // }));
  
  //   map.on('load', function () {
  //       // Add a new source from our GeoJSON data and set the
  //       // 'cluster' option to true. GL-JS will add the point_count property to your source data.
  //       map.addSource("posts", {
  //           type: "geojson",
  //           data: posts,
  //           cluster: true,
  //           clusterMaxZoom: 14, // Max zoom to cluster points on
  //           clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)
  //           // something like measurable unit for detemine point_count for each point in map
  //       });
    
  //       map.addLayer({
  //           id: "clusters",
  //           type: "circle",
  //           source: "posts",
  //           filter: ["has", "point_count"],
  //           paint: {
  //               // Use step expressions (https://www.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
  //               // with three steps to implement three types of circles:
  //               //   * Blue, 20px circles when point count is less than 100
  //               //   * Yellow, 30px circles when point count is between 100 and 750
  //               //   * Pink, 40px circles when point count is greater than or equal to 750
  //               "circle-color": [
  //                   "step",
  //                   ["get", "point_count"],
  //                   "#51bbd6",
  //                   100,
  //                   "#f1f075",
  //                   750,
  //                   "#f28cb1"
  //               ],
  //               "circle-radius": [
  //                   "step",
  //                   ["get", "point_count"],
  //                   20,
  //                   100,
  //                   30,
  //                   750,
  //                   40
  //               ]
  //           }
  //       });
    
  //       map.addLayer({
  //           id: "cluster-count",
  //           type: "symbol",
  //           source: "posts",
  //           filter: ["has", "point_count"],
  //           layout: {
  //               "text-field": "{point_count_abbreviated}",
  //               "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
  //               "text-size": 12
  //           }
  //       });
    
  //       map.addLayer({
  //           id: "unclustered-point",
  //           type: "circle",
  //           source: "posts",
  //           filter: ["!", ["has", "point_count"]],
  //           paint: {
  //               "circle-color": "#11b4da",
  //               "circle-radius": 5,
  //               "circle-stroke-width": 1,
  //               "circle-stroke-color": "#fff"
  //           }
  //       });
    
  //       map.on('click', 'unclustered-point', function (e) {
  //           var coordinates = e.features[0].geometry.coordinates.slice();
  //           var description = e.features[0].properties.description;
    
  //           // Ensure that if the map is zoomed out such that multiple
  //           // copies of the feature are visible, the popup appears
  //           // over the copy being pointed to.
  //           while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
  //               coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
  //           }
    
  //           new mapboxgl.Popup()
  //               .setLngLat(coordinates)
  //               .setHTML(description)
  //               .addTo(map);
  //       });
    
  //       // inspect a cluster on click
  //       map.on('click', 'clusters', function (e) {
  //           var features = map.queryRenderedFeatures(e.point, { layers: ['clusters'] });
  //           var clusterId = features[0].properties.cluster_id;
  //           map.getSource('posts').getClusterExpansionZoom(clusterId, function (err, zoom) {
  //               if (err)
  //                   return;
    
  //               map.easeTo({
  //                   center: features[0].geometry.coordinates,
  //                   zoom: zoom
  //               });
  //           });
  //       });
    
  //       var mouseenterCursor = function () {
  //           map.getCanvas().style.cursor = 'pointer';
  //       };
  //       var mouseLeaveCursor = function () {
  //           map.getCanvas().style.cursor = '';
  //       };
  //       map.on('mouseenter', 'clusters', mouseenterCursor);
  //       map.on('mouseleave', 'clusters', mouseLeaveCursor);
  //       map.on('mouseenter', 'unclustered-point', mouseenterCursor);
  //       map.on('mouseleave', 'unclustered-point', mouseLeaveCursor);
  //   });
  //   },[])
  return (
    <Box
      sx={{
        bgcolor: "#f5f5f5",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 2 ,
      }}
    >
      <Card sx={{ width: "90%"}}>
        <Map/>
      </Card>
    </Box>
  );
}

export default LeftContent;
