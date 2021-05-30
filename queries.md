select stations.\*, avg(measurements.no2), g.series from aasuero.test_airquality_stations AS stations
LEFT JOIN aasuero.test_airquality_measurements AS measurements
ON stations.station_id = measurements.station_id
LEFT JOIN generate_series(timestamp '2016-10-05', '2016-12-10', '1 WEEK') as g(series)
ON measurements.timeinstant between (g.series - INTERVAL '1 WEEK') AND g.series
WHERE ST_Intersects(stations.the_geom, ST_GeomFromGeoJSON('{"type":"Polygon","coordinates":[[[-3.63289587199688,40.56439731247202],[-3.661734983325005,40.55618117044514],[-3.66310827434063,40.53583209794804],[-3.6378740519285206,40.52421992151271],[-3.6148714274168015,40.5239589506112],[-3.60543005168438,40.547181381686634],[-3.63289587199688,40.56439731247202]]]}'))
GROUP BY stations.cartodb_id, g.series

SELECT stations.\*, avg(measurements.no2), g.series as period_end, (g.series - INTERVAL '1 WEEK') as period_start
FROM aasuero.test_airquality_stations AS stations
LEFT JOIN aasuero.test_airquality_measurements AS measurements
ON stations.station_id = measurements.station_id
LEFT JOIN generate_series(timestamp '2016-10-05', '2016-12-10', '1 WEEK') as g(series)
ON measurements.timeinstant between (g.series - INTERVAL '1 WEEK') AND g.series
WHERE stations.station_id IN ('aq_jaen', 'aq_salvia')
GROUP BY stations.cartodb_id, g.series
