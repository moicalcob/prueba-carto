interface StatisticalMeasurementParams {
  start_date?: string;
  end_date?: string;
  variable: string;
  statistical_measurement: string;
}

interface StationTimeserieParams {
  variable: string;
  step: string;
  statistical_measurement: string;
  start_date: string;
  end_date: string;
  station_id?: string;
  geom?: string;
  stations?: string[];
}
