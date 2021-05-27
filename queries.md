SELECT station.\*,
avg(quality_measurement.no2) AS avg_no2,
max(esp_grid.population)
FROM aasuero.test_airquality_stations AS station
JOIN aasuero.esp_grid_1km_demographics AS esp_grid
ON ST_Within(station.the_geom,esp_grid.the_geom)
JOIN aasuero.test_airquality_measurements AS quality_measurement
ON station.station_id = quality_measurement.station_id
GROUP BY station.cartodb_id

SELECT avg(no2) as avg_no2 FROM aasuero.test_airquality_measurements WHERE station_id = 'aq_jaen' AND timeinstant between '2016-11-11' AND '2016-11-20'

SELECT g.series FROM generate_series(timestamp '2004-03-07 00:00', '2004-08-16 00:00', '1 hour') AS g(series);

SELECT g.series, avg(t.no2), t.station_id
FROM generate_series(timestamp '2016-10-05 00:00', '2016-10-16 00:00', '1 DAY') as g(series)
LEFT JOIN aasuero.test_airquality_measurements t
ON t.timeinstant BETWEEN g.series AND g.series - INTERVAL '1 DAY'
WHERE t.station_id = 'aq_jaen'
GROUP BY g.series
ORDER BY g.series ASC;

SELECT \*
FROM aasuero.test_airquality_measurements t
LEFT JOIN generate_series(timestamp '2016-10-05 00:00', '2016-10-16 00:00', '1 DAY') as g(series)
ON t.timeinstant BETWEEN g.series AND g.series - INTERVAL '1 DAY'
WHERE t.station_id = 'aq_jaen'
GROUP BY t.cartodb_id, g.series, t.station_id

SELECT g.series, (
    SELECT avg(no2) as avg_no2 FROM aasuero.test_airquality_measurements WHERE station_id = 'aq_jaen' AND timeinstant between (g.series - INTERVAL '1 DAY') AND g.series
)
FROM generate_series(timestamp '2016-10-05 00:00', '2016-10-16 00:00', '1 DAY') as g(series)
GROUP BY g.series
ORDER BY g.series
