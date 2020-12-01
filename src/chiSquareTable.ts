// ROW
// degrees of freedom, 1...30

// COLUMN
// The areas given across the top are the areas to the right of the critical value.
// To look up an area on the left, subtract it from one, and then look it up (ie: 0.05 on the left is 0.95 on the right)
// columns represent: 0.995	0.99	0.975	0.95	0.90	0.10	0.05	0.025	0.01	0.005

// table from: https://people.richland.edu/james/lecture/m170/tbl-chi.html

export const chiSquareTable = [
  [0, 0, 0.001, 0.004, 0.016, 2.706, 3.841, 5.024, 6.635, 7.879],
  [0.01, 0.02, 0.051, 0.103, 0.211, 4.605, 5.991, 7.378, 9.21, 10.597],
  [0.072, 0.115, 0.216, 0.352, 0.584, 6.251, 7.815, 9.348, 11.345, 12.838],
  [0.207, 0.297, 0.484, 0.711, 1.064, 7.779, 9.488, 11.143, 13.277, 14.86],
  [0.412, 0.554, 0.831, 1.145, 1.61, 9.236, 11.07, 12.833, 15.086, 16.75],
  [0.676, 0.872, 1.237, 1.635, 2.204, 10.645, 12.592, 14.449, 16.812, 18.548],
  [0.989, 1.239, 1.69, 2.167, 2.833, 12.017, 14.067, 16.013, 18.475, 20.278],
  [1.344, 1.646, 2.18, 2.733, 3.49, 13.362, 15.507, 17.535, 20.09, 21.955],
  [1.735, 2.088, 2.7, 3.325, 4.168, 14.684, 16.919, 19.023, 21.666, 23.589],
  [2.156, 2.558, 3.247, 3.94, 4.865, 15.987, 18.307, 20.483, 23.209, 25.188],
  [2.603, 3.053, 3.816, 4.575, 5.578, 17.275, 19.675, 21.92, 24.725, 26.757],
  [3.074, 3.571, 4.404, 5.226, 6.304, 18.549, 21.026, 23.337, 26.217, 28.3],
  [3.565, 4.107, 5.009, 5.892, 7.042, 19.812, 22.362, 24.736, 27.688, 29.819],
  [4.075, 4.66, 5.629, 6.571, 7.79, 21.064, 23.685, 26.119, 29.141, 31.319],
  [4.601, 5.229, 6.262, 7.261, 8.547, 22.307, 24.996, 27.488, 30.578, 32.801],
  [5.142, 5.812, 6.908, 7.962, 9.312, 23.542, 26.296, 28.845, 32, 34.267],
  [5.697, 6.408, 7.564, 8.672, 10.085, 24.769, 27.587, 30.191, 33.409, 35.718],
  [6.265, 7.015, 8.231, 9.39, 10.865, 25.989, 28.869, 31.526, 34.805, 37.156],
  [6.844, 7.633, 8.907, 10.117, 11.651, 27.204, 30.144, 32.852, 36.191, 38.582],
  [7.434, 8.26, 9.591, 10.851, 12.443, 28.412, 31.41, 34.17, 37.566, 39.997],
  [8.034, 8.897, 10.283, 11.591, 13.24, 29.615, 32.671, 35.479, 38.932, 41.401],
  [
    8.643,
    9.542,
    10.982,
    12.338,
    14.041,
    30.813,
    33.924,
    36.781,
    40.289,
    42.796,
  ],
  [
    9.26,
    10.196,
    11.689,
    13.091,
    14.848,
    32.007,
    35.172,
    38.076,
    41.638,
    44.181,
  ],
  [
    9.886,
    10.856,
    12.401,
    13.848,
    15.659,
    33.196,
    36.415,
    39.364,
    42.98,
    45.559,
  ],
  [
    10.52,
    11.524,
    13.12,
    14.611,
    16.473,
    34.382,
    37.652,
    40.646,
    44.314,
    46.928,
  ],
  [
    11.16,
    12.198,
    13.844,
    15.379,
    17.292,
    35.563,
    38.885,
    41.923,
    45.642,
    48.29,
  ],
  [
    11.808,
    12.879,
    14.573,
    16.151,
    18.114,
    36.741,
    40.113,
    43.195,
    46.963,
    49.645,
  ],
  [
    12.461,
    13.565,
    15.308,
    16.928,
    18.939,
    37.916,
    41.337,
    44.461,
    48.278,
    50.993,
  ],
  [
    13.121,
    14.256,
    16.047,
    17.708,
    19.768,
    39.087,
    42.557,
    45.722,
    49.588,
    52.336,
  ],
  [
    13.787,
    14.953,
    16.791,
    18.493,
    20.599,
    40.256,
    43.773,
    46.979,
    50.892,
    53.672,
  ],
];