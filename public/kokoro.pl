kokoro_help :- 
  write("╔═══════════════════════════════════════════╗"), nl,
  write("║ Welcome to Kokoro-AI                      ║"), nl,
  write("║ Try with the following rules              ║"), nl,
  write("║                                           ║"), nl,
  write("║ Get all the diseases for all the patients ║"), nl,
  write("║   disease(X, Y).                          ║"), nl,
  write("║                                           ║"), nl,
  write("║ Get all the diseases for lucas            ║"), nl,
  write("║   disease(lucas, Y).                      ║"), nl,
  write("║                                           ║"), nl,
  write("║ Get all the patients with atherosclerotic ║"), nl,
  write("║   disease(lucas, Y).                      ║"), nl,
  write("╚═══════════════════════════════════════════╝").

resting_blood_pressure_162_0(X) :- X =< 162.
resting_blood_pressure_109_0(X) :- X =< 109.

num_major_vessels_0_5(X) :- X =< 0.5.
num_major_vessels_2_5(X) :- X =< 2.5.

thalassemia(X) :- X =\= 2.

st_slope(X) :- X =\= 1.

age_51_5(Age) :- Age =< 51.5.
age_45_5(Age) :- Age =< 45.5.

exercise_induced_angina(_) :- true.

st_depression_0_25(X) :- X =< 0.25.
st_depression_2_3(X) :- X =< 2.3.

cholesterol_221_5(X) :- X =< 221.5.

chest_pain_type(X) :- X =\= 2.

disease0(Patient) :-
  symptom(Patient, resting_blood_pressure, RestingBloodPressure),
  not(resting_blood_pressure_162_0(RestingBloodPressure)).

disease1(Patient) :-
  symptom(Patient, st_depression, StDepression),
  not(st_depression_0_25(StDepression)),

  symptom(Patient, age, Age),
  age_51_5(Age),

  symptom(Patient, thalassemia, Thalassemia),
  thalassemia(Thalassemia),

  symptom(Patient, num_major_vessels, NumMajorVessels),
  num_major_vessels_0_5(NumMajorVessels),

  symptom(Patient, resting_blood_pressure, RestingBloodPressure),
  resting_blood_pressure_162_0(RestingBloodPressure).

disease2(Patient) :-
  symptom(Patient, cholesterol, Cholesterol),
  cholesterol_221_5(Cholesterol),

  symptom(Patient, age, Age),
  not(age_51_5(Age)),

  symptom(Patient, thalassemia, Thalassemia),
  thalassemia(Thalassemia),

  symptom(Patient, num_major_vessels, NumMajorVessels),
  num_major_vessels_0_5(NumMajorVessels),

  symptom(Patient, resting_blood_pressure, RestingBloodPressure),
  resting_blood_pressure_162_0(RestingBloodPressure).

disease3(Patient) :-
  symptom(Patient, age, X),
  not(age_45_5(X)),
  
  symptom(Patient, resting_blood_pressure, RestingBloodPressure),
  resting_blood_pressure_109_0(RestingBloodPressure),
  
  symptom(Patient, thalassemia, Thalassemia),
  not(thalassemia(Thalassemia)),
  
  symptom(Patient, num_major_vessels, NumMajorVessels),
  num_major_vessels_0_5(NumMajorVessels),
  
  symptom(Patient, resting_blood_pressure, RestingBloodPressure2),
  resting_blood_pressure_162_0(RestingBloodPressure2).

disease4(Patient) :-
  symptom(Patient, st_depression, StDepression),
  not(st_depression_2_3(StDepression)),
  
  symptom(Patient, resting_blood_pressure, RestingBloodPressure),
  not(resting_blood_pressure_109_0(RestingBloodPressure)),
  
  symptom(Patient, thalassemia, Thalassemia),
  not(thalassemia(Thalassemia)),
  
  symptom(Patient, num_major_vessels, NumMajorVessels),
  num_major_vessels_0_5(NumMajorVessels),
  
  symptom(Patient, resting_blood_pressure, RestingBloodPressure2),
  resting_blood_pressure_162_0(RestingBloodPressure2).

disease5(Patient) :-
  symptom(Patient, chest_pain_type, ChestPainType),
  chest_pain_type(ChestPainType),
  
  symptom(Patient, thalassemia, Thalassemia),
  thalassemia(Thalassemia),
  
  symptom(Patient, st_slope, StSlope),
  st_slope(StSlope),
  
  symptom(Patient, num_major_vessels, NumMajorVessels),
  not(num_major_vessels_0_5(NumMajorVessels)),
  
  symptom(Patient, resting_blood_pressure, RestingBloodPressure),
  resting_blood_pressure_162_0(RestingBloodPressure).

disease6(Patient) :-
  symptom(Patient, num_major_vessels, NumMajorVessels),
  not(num_major_vessels_2_5(NumMajorVessels)),
  
  symptom(Patient, thalassemia, Thalassemia),
  not(thalassemia(Thalassemia)),
  
  symptom(Patient, st_slope, StSlope),
  st_slope(StSlope),
  
  symptom(Patient, num_major_vessels, NumMajorVessels2),
  not(num_major_vessels_0_5(NumMajorVessels2)),
  
  symptom(Patient, resting_blood_pressure, RestingBloodPressure),
  resting_blood_pressure_162_0(RestingBloodPressure).

disease7(Patient) :-
  symptom(Patient, st_slope, StSlope),
  not(st_slope(StSlope)),
  
  symptom(Patient, num_major_vessels, NumMajorVessels),
  not(num_major_vessels_0_5(NumMajorVessels)),
  
  symptom(Patient, resting_blood_pressure, RestingBloodPressure),
  resting_blood_pressure_162_0(RestingBloodPressure).

disease(Patient) :-
  disease0(Patient);
  disease1(Patient);
  disease2(Patient);
  disease3(Patient);
  disease4(Patient);
  disease5(Patient);
  disease6(Patient);
  disease7(Patient).

assert_disease(Patient) :-
  dynamic(symptom/3),
  write("Patient "), write(Patient), nl,

  write("Type resting_blood_pressure"), nl,
  read(RestingBloodPressure),
  assert((symptom(Patient, resting_blood_pressure, RestingBloodPressure))),

  write("Type num_major_vessels"), nl,
  read(NumMajorVessels),
  assert((symptom(Patient, num_major_vessels, NumMajorVessels))),

  write("Type thalassemia"), nl,
  read(Thalassemia),
  assert((symptom(Patient, thalassemia, Thalassemia))),

  write("Type st_slope"), nl,
  read(StSlope),
  assert((symptom(Patient, st_slope, StSlope))),

  write("Type age"), nl,
  read(Age),
  assert((symptom(Patient, age, Age))),

  write("Type exercise_induced_angina"), nl,
  read(ExerciseInducedAngina),
  assert((symptom(Patient, exercise_induced_angina, ExerciseInducedAngina))),

  write("Type st_depression"), nl,
  read(StDepression),
  assert((symptom(Patient, st_depression, StDepression))),

  write("Type cholesterol"), nl,
  read(Cholesterol),
  assert((symptom(Patient, cholesterol, Cholesterol))),

  write("Type chest_pain_type"), nl,
  read(ChestPainType),
  assert((symptom(Patient, chest_pain_type, ChestPainType))),

  disease(Patient).symptom(p0, age, 63.0).

symptom(p0, age, 63.0).
symptom(p0, chest_pain_type, 3.0).
symptom(p0, resting_blood_pressure, 145.0).
symptom(p0, cholesterol, 233.0).
symptom(p0, exercise_induced_angina, 0.0).
symptom(p0, st_depression, 2.3).
symptom(p0, st_slope, 0.0).
symptom(p0, num_major_vessels, 0.0).
symptom(p0, thalassemia, 1.0).

symptom(p1, age, 37.0).
symptom(p1, chest_pain_type, 2.0).
symptom(p1, resting_blood_pressure, 130.0).
symptom(p1, cholesterol, 250.0).
symptom(p1, exercise_induced_angina, 0.0).
symptom(p1, st_depression, 3.5).
symptom(p1, st_slope, 0.0).
symptom(p1, num_major_vessels, 0.0).
symptom(p1, thalassemia, 2.0).

symptom(p2, age, 41.0).
symptom(p2, chest_pain_type, 1.0).
symptom(p2, resting_blood_pressure, 130.0).
symptom(p2, cholesterol, 204.0).
symptom(p2, exercise_induced_angina, 0.0).
symptom(p2, st_depression, 1.4).
symptom(p2, st_slope, 2.0).
symptom(p2, num_major_vessels, 0.0).
symptom(p2, thalassemia, 2.0).

symptom(p3, age, 56.0).
symptom(p3, chest_pain_type, 1.0).
symptom(p3, resting_blood_pressure, 120.0).
symptom(p3, cholesterol, 236.0).
symptom(p3, exercise_induced_angina, 0.0).
symptom(p3, st_depression, 0.8).
symptom(p3, st_slope, 2.0).
symptom(p3, num_major_vessels, 0.0).
symptom(p3, thalassemia, 2.0).

symptom(p4, age, 57.0).
symptom(p4, chest_pain_type, 0.0).
symptom(p4, resting_blood_pressure, 120.0).
symptom(p4, cholesterol, 354.0).
symptom(p4, exercise_induced_angina, 1.0).
symptom(p4, st_depression, 0.6).
symptom(p4, st_slope, 2.0).
symptom(p4, num_major_vessels, 0.0).
symptom(p4, thalassemia, 2.0).

symptom(p5, age, 57.0).
symptom(p5, chest_pain_type, 0.0).
symptom(p5, resting_blood_pressure, 140.0).
symptom(p5, cholesterol, 192.0).
symptom(p5, exercise_induced_angina, 0.0).
symptom(p5, st_depression, 0.4).
symptom(p5, st_slope, 1.0).
symptom(p5, num_major_vessels, 0.0).
symptom(p5, thalassemia, 1.0).

symptom(p6, age, 56.0).
symptom(p6, chest_pain_type, 1.0).
symptom(p6, resting_blood_pressure, 140.0).
symptom(p6, cholesterol, 294.0).
symptom(p6, exercise_induced_angina, 0.0).
symptom(p6, st_depression, 1.3).
symptom(p6, st_slope, 1.0).
symptom(p6, num_major_vessels, 0.0).
symptom(p6, thalassemia, 2.0).

symptom(p7, age, 44.0).
symptom(p7, chest_pain_type, 1.0).
symptom(p7, resting_blood_pressure, 120.0).
symptom(p7, cholesterol, 263.0).
symptom(p7, exercise_induced_angina, 0.0).
symptom(p7, st_depression, 0.0).
symptom(p7, st_slope, 2.0).
symptom(p7, num_major_vessels, 0.0).
symptom(p7, thalassemia, 3.0).

symptom(p8, age, 52.0).
symptom(p8, chest_pain_type, 2.0).
symptom(p8, resting_blood_pressure, 172.0).
symptom(p8, cholesterol, 199.0).
symptom(p8, exercise_induced_angina, 0.0).
symptom(p8, st_depression, 0.5).
symptom(p8, st_slope, 2.0).
symptom(p8, num_major_vessels, 0.0).
symptom(p8, thalassemia, 3.0).

symptom(p9, age, 57.0).
symptom(p9, chest_pain_type, 2.0).
symptom(p9, resting_blood_pressure, 150.0).
symptom(p9, cholesterol, 168.0).
symptom(p9, exercise_induced_angina, 0.0).
symptom(p9, st_depression, 1.6).
symptom(p9, st_slope, 2.0).
symptom(p9, num_major_vessels, 0.0).
symptom(p9, thalassemia, 2.0).

symptom(p10, age, 54.0).
symptom(p10, chest_pain_type, 0.0).
symptom(p10, resting_blood_pressure, 140.0).
symptom(p10, cholesterol, 239.0).
symptom(p10, exercise_induced_angina, 0.0).
symptom(p10, st_depression, 1.2).
symptom(p10, st_slope, 2.0).
symptom(p10, num_major_vessels, 0.0).
symptom(p10, thalassemia, 2.0).

symptom(p11, age, 48.0).
symptom(p11, chest_pain_type, 2.0).
symptom(p11, resting_blood_pressure, 130.0).
symptom(p11, cholesterol, 275.0).
symptom(p11, exercise_induced_angina, 0.0).
symptom(p11, st_depression, 0.2).
symptom(p11, st_slope, 2.0).
symptom(p11, num_major_vessels, 0.0).
symptom(p11, thalassemia, 2.0).

symptom(p12, age, 49.0).
symptom(p12, chest_pain_type, 1.0).
symptom(p12, resting_blood_pressure, 130.0).
symptom(p12, cholesterol, 266.0).
symptom(p12, exercise_induced_angina, 0.0).
symptom(p12, st_depression, 0.6).
symptom(p12, st_slope, 2.0).
symptom(p12, num_major_vessels, 0.0).
symptom(p12, thalassemia, 2.0).

symptom(p13, age, 64.0).
symptom(p13, chest_pain_type, 3.0).
symptom(p13, resting_blood_pressure, 110.0).
symptom(p13, cholesterol, 211.0).
symptom(p13, exercise_induced_angina, 1.0).
symptom(p13, st_depression, 1.8).
symptom(p13, st_slope, 1.0).
symptom(p13, num_major_vessels, 0.0).
symptom(p13, thalassemia, 2.0).

symptom(p14, age, 58.0).
symptom(p14, chest_pain_type, 3.0).
symptom(p14, resting_blood_pressure, 150.0).
symptom(p14, cholesterol, 283.0).
symptom(p14, exercise_induced_angina, 0.0).
symptom(p14, st_depression, 1.0).
symptom(p14, st_slope, 2.0).
symptom(p14, num_major_vessels, 0.0).
symptom(p14, thalassemia, 2.0).

symptom(p15, age, 50.0).
symptom(p15, chest_pain_type, 2.0).
symptom(p15, resting_blood_pressure, 120.0).
symptom(p15, cholesterol, 219.0).
symptom(p15, exercise_induced_angina, 0.0).
symptom(p15, st_depression, 1.6).
symptom(p15, st_slope, 1.0).
symptom(p15, num_major_vessels, 0.0).
symptom(p15, thalassemia, 2.0).

symptom(p16, age, 58.0).
symptom(p16, chest_pain_type, 2.0).
symptom(p16, resting_blood_pressure, 120.0).
symptom(p16, cholesterol, 340.0).
symptom(p16, exercise_induced_angina, 0.0).
symptom(p16, st_depression, 0.0).
symptom(p16, st_slope, 2.0).
symptom(p16, num_major_vessels, 0.0).
symptom(p16, thalassemia, 2.0).

symptom(p17, age, 66.0).
symptom(p17, chest_pain_type, 3.0).
symptom(p17, resting_blood_pressure, 150.0).
symptom(p17, cholesterol, 226.0).
symptom(p17, exercise_induced_angina, 0.0).
symptom(p17, st_depression, 2.6).
symptom(p17, st_slope, 0.0).
symptom(p17, num_major_vessels, 0.0).
symptom(p17, thalassemia, 2.0).

symptom(p18, age, 43.0).
symptom(p18, chest_pain_type, 0.0).
symptom(p18, resting_blood_pressure, 150.0).
symptom(p18, cholesterol, 247.0).
symptom(p18, exercise_induced_angina, 0.0).
symptom(p18, st_depression, 1.5).
symptom(p18, st_slope, 2.0).
symptom(p18, num_major_vessels, 0.0).
symptom(p18, thalassemia, 2.0).

symptom(p19, age, 69.0).
symptom(p19, chest_pain_type, 3.0).
symptom(p19, resting_blood_pressure, 140.0).
symptom(p19, cholesterol, 239.0).
symptom(p19, exercise_induced_angina, 0.0).
symptom(p19, st_depression, 1.8).
symptom(p19, st_slope, 2.0).
symptom(p19, num_major_vessels, 2.0).
symptom(p19, thalassemia, 2.0).

symptom(p20, age, 59.0).
symptom(p20, chest_pain_type, 0.0).
symptom(p20, resting_blood_pressure, 135.0).
symptom(p20, cholesterol, 234.0).
symptom(p20, exercise_induced_angina, 0.0).
symptom(p20, st_depression, 0.5).
symptom(p20, st_slope, 1.0).
symptom(p20, num_major_vessels, 0.0).
symptom(p20, thalassemia, 3.0).

symptom(p21, age, 44.0).
symptom(p21, chest_pain_type, 2.0).
symptom(p21, resting_blood_pressure, 130.0).
symptom(p21, cholesterol, 233.0).
symptom(p21, exercise_induced_angina, 1.0).
symptom(p21, st_depression, 0.4).
symptom(p21, st_slope, 2.0).
symptom(p21, num_major_vessels, 0.0).
symptom(p21, thalassemia, 2.0).

symptom(p22, age, 42.0).
symptom(p22, chest_pain_type, 0.0).
symptom(p22, resting_blood_pressure, 140.0).
symptom(p22, cholesterol, 226.0).
symptom(p22, exercise_induced_angina, 0.0).
symptom(p22, st_depression, 0.0).
symptom(p22, st_slope, 2.0).
symptom(p22, num_major_vessels, 0.0).
symptom(p22, thalassemia, 2.0).

symptom(p23, age, 61.0).
symptom(p23, chest_pain_type, 2.0).
symptom(p23, resting_blood_pressure, 150.0).
symptom(p23, cholesterol, 243.0).
symptom(p23, exercise_induced_angina, 1.0).
symptom(p23, st_depression, 1.0).
symptom(p23, st_slope, 1.0).
symptom(p23, num_major_vessels, 0.0).
symptom(p23, thalassemia, 2.0).

symptom(p24, age, 40.0).
symptom(p24, chest_pain_type, 3.0).
symptom(p24, resting_blood_pressure, 140.0).
symptom(p24, cholesterol, 199.0).
symptom(p24, exercise_induced_angina, 1.0).
symptom(p24, st_depression, 1.4).
symptom(p24, st_slope, 2.0).
symptom(p24, num_major_vessels, 0.0).
symptom(p24, thalassemia, 3.0).

symptom(p25, age, 71.0).
symptom(p25, chest_pain_type, 1.0).
symptom(p25, resting_blood_pressure, 160.0).
symptom(p25, cholesterol, 302.0).
symptom(p25, exercise_induced_angina, 0.0).
symptom(p25, st_depression, 0.4).
symptom(p25, st_slope, 2.0).
symptom(p25, num_major_vessels, 2.0).
symptom(p25, thalassemia, 2.0).

symptom(p26, age, 59.0).
symptom(p26, chest_pain_type, 2.0).
symptom(p26, resting_blood_pressure, 150.0).
symptom(p26, cholesterol, 212.0).
symptom(p26, exercise_induced_angina, 0.0).
symptom(p26, st_depression, 1.6).
symptom(p26, st_slope, 2.0).
symptom(p26, num_major_vessels, 0.0).
symptom(p26, thalassemia, 2.0).

symptom(p27, age, 51.0).
symptom(p27, chest_pain_type, 2.0).
symptom(p27, resting_blood_pressure, 110.0).
symptom(p27, cholesterol, 175.0).
symptom(p27, exercise_induced_angina, 0.0).
symptom(p27, st_depression, 0.6).
symptom(p27, st_slope, 2.0).
symptom(p27, num_major_vessels, 0.0).
symptom(p27, thalassemia, 2.0).

symptom(p28, age, 65.0).
symptom(p28, chest_pain_type, 2.0).
symptom(p28, resting_blood_pressure, 140.0).
symptom(p28, cholesterol, 417.0).
symptom(p28, exercise_induced_angina, 0.0).
symptom(p28, st_depression, 0.8).
symptom(p28, st_slope, 2.0).
symptom(p28, num_major_vessels, 1.0).
symptom(p28, thalassemia, 2.0).

symptom(p29, age, 53.0).
symptom(p29, chest_pain_type, 2.0).
symptom(p29, resting_blood_pressure, 130.0).
symptom(p29, cholesterol, 197.0).
symptom(p29, exercise_induced_angina, 0.0).
symptom(p29, st_depression, 1.2).
symptom(p29, st_slope, 0.0).
symptom(p29, num_major_vessels, 0.0).
symptom(p29, thalassemia, 2.0).

symptom(p30, age, 41.0).
symptom(p30, chest_pain_type, 1.0).
symptom(p30, resting_blood_pressure, 105.0).
symptom(p30, cholesterol, 198.0).
symptom(p30, exercise_induced_angina, 0.0).
symptom(p30, st_depression, 0.0).
symptom(p30, st_slope, 2.0).
symptom(p30, num_major_vessels, 1.0).
symptom(p30, thalassemia, 2.0).

symptom(p31, age, 65.0).
symptom(p31, chest_pain_type, 0.0).
symptom(p31, resting_blood_pressure, 120.0).
symptom(p31, cholesterol, 177.0).
symptom(p31, exercise_induced_angina, 0.0).
symptom(p31, st_depression, 0.4).
symptom(p31, st_slope, 2.0).
symptom(p31, num_major_vessels, 0.0).
symptom(p31, thalassemia, 3.0).

symptom(p32, age, 44.0).
symptom(p32, chest_pain_type, 1.0).
symptom(p32, resting_blood_pressure, 130.0).
symptom(p32, cholesterol, 219.0).
symptom(p32, exercise_induced_angina, 0.0).
symptom(p32, st_depression, 0.0).
symptom(p32, st_slope, 2.0).
symptom(p32, num_major_vessels, 0.0).
symptom(p32, thalassemia, 2.0).

symptom(p33, age, 54.0).
symptom(p33, chest_pain_type, 2.0).
symptom(p33, resting_blood_pressure, 125.0).
symptom(p33, cholesterol, 273.0).
symptom(p33, exercise_induced_angina, 0.0).
symptom(p33, st_depression, 0.5).
symptom(p33, st_slope, 0.0).
symptom(p33, num_major_vessels, 1.0).
symptom(p33, thalassemia, 2.0).

symptom(p34, age, 51.0).
symptom(p34, chest_pain_type, 3.0).
symptom(p34, resting_blood_pressure, 125.0).
symptom(p34, cholesterol, 213.0).
symptom(p34, exercise_induced_angina, 1.0).
symptom(p34, st_depression, 1.4).
symptom(p34, st_slope, 2.0).
symptom(p34, num_major_vessels, 1.0).
symptom(p34, thalassemia, 2.0).

symptom(p35, age, 46.0).
symptom(p35, chest_pain_type, 2.0).
symptom(p35, resting_blood_pressure, 142.0).
symptom(p35, cholesterol, 177.0).
symptom(p35, exercise_induced_angina, 1.0).
symptom(p35, st_depression, 1.4).
symptom(p35, st_slope, 0.0).
symptom(p35, num_major_vessels, 0.0).
symptom(p35, thalassemia, 2.0).

symptom(p36, age, 54.0).
symptom(p36, chest_pain_type, 2.0).
symptom(p36, resting_blood_pressure, 135.0).
symptom(p36, cholesterol, 304.0).
symptom(p36, exercise_induced_angina, 0.0).
symptom(p36, st_depression, 0.0).
symptom(p36, st_slope, 2.0).
symptom(p36, num_major_vessels, 0.0).
symptom(p36, thalassemia, 2.0).

symptom(p37, age, 54.0).
symptom(p37, chest_pain_type, 2.0).
symptom(p37, resting_blood_pressure, 150.0).
symptom(p37, cholesterol, 232.0).
symptom(p37, exercise_induced_angina, 0.0).
symptom(p37, st_depression, 1.6).
symptom(p37, st_slope, 2.0).
symptom(p37, num_major_vessels, 0.0).
symptom(p37, thalassemia, 3.0).

symptom(p38, age, 65.0).
symptom(p38, chest_pain_type, 2.0).
symptom(p38, resting_blood_pressure, 155.0).
symptom(p38, cholesterol, 269.0).
symptom(p38, exercise_induced_angina, 0.0).
symptom(p38, st_depression, 0.8).
symptom(p38, st_slope, 2.0).
symptom(p38, num_major_vessels, 0.0).
symptom(p38, thalassemia, 2.0).

symptom(p39, age, 65.0).
symptom(p39, chest_pain_type, 2.0).
symptom(p39, resting_blood_pressure, 160.0).
symptom(p39, cholesterol, 360.0).
symptom(p39, exercise_induced_angina, 0.0).
symptom(p39, st_depression, 0.8).
symptom(p39, st_slope, 2.0).
symptom(p39, num_major_vessels, 0.0).
symptom(p39, thalassemia, 2.0).

symptom(p40, age, 51.0).
symptom(p40, chest_pain_type, 2.0).
symptom(p40, resting_blood_pressure, 140.0).
symptom(p40, cholesterol, 308.0).
symptom(p40, exercise_induced_angina, 0.0).
symptom(p40, st_depression, 1.5).
symptom(p40, st_slope, 2.0).
symptom(p40, num_major_vessels, 1.0).
symptom(p40, thalassemia, 2.0).

symptom(p41, age, 48.0).
symptom(p41, chest_pain_type, 1.0).
symptom(p41, resting_blood_pressure, 130.0).
symptom(p41, cholesterol, 245.0).
symptom(p41, exercise_induced_angina, 0.0).
symptom(p41, st_depression, 0.2).
symptom(p41, st_slope, 1.0).
symptom(p41, num_major_vessels, 0.0).
symptom(p41, thalassemia, 2.0).

symptom(p42, age, 45.0).
symptom(p42, chest_pain_type, 0.0).
symptom(p42, resting_blood_pressure, 104.0).
symptom(p42, cholesterol, 208.0).
symptom(p42, exercise_induced_angina, 1.0).
symptom(p42, st_depression, 3.0).
symptom(p42, st_slope, 1.0).
symptom(p42, num_major_vessels, 0.0).
symptom(p42, thalassemia, 2.0).

symptom(p43, age, 53.0).
symptom(p43, chest_pain_type, 0.0).
symptom(p43, resting_blood_pressure, 130.0).
symptom(p43, cholesterol, 264.0).
symptom(p43, exercise_induced_angina, 0.0).
symptom(p43, st_depression, 0.4).
symptom(p43, st_slope, 1.0).
symptom(p43, num_major_vessels, 0.0).
symptom(p43, thalassemia, 2.0).

symptom(p44, age, 39.0).
symptom(p44, chest_pain_type, 2.0).
symptom(p44, resting_blood_pressure, 140.0).
symptom(p44, cholesterol, 321.0).
symptom(p44, exercise_induced_angina, 0.0).
symptom(p44, st_depression, 0.0).
symptom(p44, st_slope, 2.0).
symptom(p44, num_major_vessels, 0.0).
symptom(p44, thalassemia, 2.0).

symptom(p45, age, 52.0).
symptom(p45, chest_pain_type, 1.0).
symptom(p45, resting_blood_pressure, 120.0).
symptom(p45, cholesterol, 325.0).
symptom(p45, exercise_induced_angina, 0.0).
symptom(p45, st_depression, 0.2).
symptom(p45, st_slope, 2.0).
symptom(p45, num_major_vessels, 0.0).
symptom(p45, thalassemia, 2.0).

symptom(p46, age, 44.0).
symptom(p46, chest_pain_type, 2.0).
symptom(p46, resting_blood_pressure, 140.0).
symptom(p46, cholesterol, 235.0).
symptom(p46, exercise_induced_angina, 0.0).
symptom(p46, st_depression, 0.0).
symptom(p46, st_slope, 2.0).
symptom(p46, num_major_vessels, 0.0).
symptom(p46, thalassemia, 2.0).

symptom(p47, age, 47.0).
symptom(p47, chest_pain_type, 2.0).
symptom(p47, resting_blood_pressure, 138.0).
symptom(p47, cholesterol, 257.0).
symptom(p47, exercise_induced_angina, 0.0).
symptom(p47, st_depression, 0.0).
symptom(p47, st_slope, 2.0).
symptom(p47, num_major_vessels, 0.0).
symptom(p47, thalassemia, 2.0).

symptom(p48, age, 53.0).
symptom(p48, chest_pain_type, 2.0).
symptom(p48, resting_blood_pressure, 128.0).
symptom(p48, cholesterol, 216.0).
symptom(p48, exercise_induced_angina, 0.0).
symptom(p48, st_depression, 0.0).
symptom(p48, st_slope, 2.0).
symptom(p48, num_major_vessels, 0.0).
symptom(p48, thalassemia, 0.0).

symptom(p49, age, 53.0).
symptom(p49, chest_pain_type, 0.0).
symptom(p49, resting_blood_pressure, 138.0).
symptom(p49, cholesterol, 234.0).
symptom(p49, exercise_induced_angina, 0.0).
symptom(p49, st_depression, 0.0).
symptom(p49, st_slope, 2.0).
symptom(p49, num_major_vessels, 0.0).
symptom(p49, thalassemia, 2.0).

symptom(p50, age, 51.0).
symptom(p50, chest_pain_type, 2.0).
symptom(p50, resting_blood_pressure, 130.0).
symptom(p50, cholesterol, 256.0).
symptom(p50, exercise_induced_angina, 0.0).
symptom(p50, st_depression, 0.5).
symptom(p50, st_slope, 2.0).
symptom(p50, num_major_vessels, 0.0).
symptom(p50, thalassemia, 2.0).

symptom(p51, age, 66.0).
symptom(p51, chest_pain_type, 0.0).
symptom(p51, resting_blood_pressure, 120.0).
symptom(p51, cholesterol, 302.0).
symptom(p51, exercise_induced_angina, 0.0).
symptom(p51, st_depression, 0.4).
symptom(p51, st_slope, 1.0).
symptom(p51, num_major_vessels, 0.0).
symptom(p51, thalassemia, 2.0).

symptom(p52, age, 62.0).
symptom(p52, chest_pain_type, 2.0).
symptom(p52, resting_blood_pressure, 130.0).
symptom(p52, cholesterol, 231.0).
symptom(p52, exercise_induced_angina, 0.0).
symptom(p52, st_depression, 1.8).
symptom(p52, st_slope, 1.0).
symptom(p52, num_major_vessels, 3.0).
symptom(p52, thalassemia, 3.0).

symptom(p53, age, 44.0).
symptom(p53, chest_pain_type, 2.0).
symptom(p53, resting_blood_pressure, 108.0).
symptom(p53, cholesterol, 141.0).
symptom(p53, exercise_induced_angina, 0.0).
symptom(p53, st_depression, 0.6).
symptom(p53, st_slope, 1.0).
symptom(p53, num_major_vessels, 0.0).
symptom(p53, thalassemia, 2.0).

symptom(p54, age, 63.0).
symptom(p54, chest_pain_type, 2.0).
symptom(p54, resting_blood_pressure, 135.0).
symptom(p54, cholesterol, 252.0).
symptom(p54, exercise_induced_angina, 0.0).
symptom(p54, st_depression, 0.0).
symptom(p54, st_slope, 2.0).
symptom(p54, num_major_vessels, 0.0).
symptom(p54, thalassemia, 2.0).

symptom(p55, age, 52.0).
symptom(p55, chest_pain_type, 1.0).
symptom(p55, resting_blood_pressure, 134.0).
symptom(p55, cholesterol, 201.0).
symptom(p55, exercise_induced_angina, 0.0).
symptom(p55, st_depression, 0.8).
symptom(p55, st_slope, 2.0).
symptom(p55, num_major_vessels, 1.0).
symptom(p55, thalassemia, 2.0).

symptom(p56, age, 48.0).
symptom(p56, chest_pain_type, 0.0).
symptom(p56, resting_blood_pressure, 122.0).
symptom(p56, cholesterol, 222.0).
symptom(p56, exercise_induced_angina, 0.0).
symptom(p56, st_depression, 0.0).
symptom(p56, st_slope, 2.0).
symptom(p56, num_major_vessels, 0.0).
symptom(p56, thalassemia, 2.0).

symptom(p57, age, 45.0).
symptom(p57, chest_pain_type, 0.0).
symptom(p57, resting_blood_pressure, 115.0).
symptom(p57, cholesterol, 260.0).
symptom(p57, exercise_induced_angina, 0.0).
symptom(p57, st_depression, 0.0).
symptom(p57, st_slope, 2.0).
symptom(p57, num_major_vessels, 0.0).
symptom(p57, thalassemia, 2.0).

symptom(p58, age, 34.0).
symptom(p58, chest_pain_type, 3.0).
symptom(p58, resting_blood_pressure, 118.0).
symptom(p58, cholesterol, 182.0).
symptom(p58, exercise_induced_angina, 0.0).
symptom(p58, st_depression, 0.0).
symptom(p58, st_slope, 2.0).
symptom(p58, num_major_vessels, 0.0).
symptom(p58, thalassemia, 2.0).

symptom(p59, age, 57.0).
symptom(p59, chest_pain_type, 0.0).
symptom(p59, resting_blood_pressure, 128.0).
symptom(p59, cholesterol, 303.0).
symptom(p59, exercise_induced_angina, 0.0).
symptom(p59, st_depression, 0.0).
symptom(p59, st_slope, 2.0).
symptom(p59, num_major_vessels, 1.0).
symptom(p59, thalassemia, 2.0).

symptom(p60, age, 71.0).
symptom(p60, chest_pain_type, 2.0).
symptom(p60, resting_blood_pressure, 110.0).
symptom(p60, cholesterol, 265.0).
symptom(p60, exercise_induced_angina, 0.0).
symptom(p60, st_depression, 0.0).
symptom(p60, st_slope, 2.0).
symptom(p60, num_major_vessels, 1.0).
symptom(p60, thalassemia, 2.0).

symptom(p61, age, 54.0).
symptom(p61, chest_pain_type, 1.0).
symptom(p61, resting_blood_pressure, 108.0).
symptom(p61, cholesterol, 309.0).
symptom(p61, exercise_induced_angina, 0.0).
symptom(p61, st_depression, 0.0).
symptom(p61, st_slope, 2.0).
symptom(p61, num_major_vessels, 0.0).
symptom(p61, thalassemia, 3.0).

symptom(p62, age, 52.0).
symptom(p62, chest_pain_type, 3.0).
symptom(p62, resting_blood_pressure, 118.0).
symptom(p62, cholesterol, 186.0).
symptom(p62, exercise_induced_angina, 0.0).
symptom(p62, st_depression, 0.0).
symptom(p62, st_slope, 1.0).
symptom(p62, num_major_vessels, 0.0).
symptom(p62, thalassemia, 1.0).

symptom(p63, age, 41.0).
symptom(p63, chest_pain_type, 1.0).
symptom(p63, resting_blood_pressure, 135.0).
symptom(p63, cholesterol, 203.0).
symptom(p63, exercise_induced_angina, 0.0).
symptom(p63, st_depression, 0.0).
symptom(p63, st_slope, 1.0).
symptom(p63, num_major_vessels, 0.0).
symptom(p63, thalassemia, 1.0).

symptom(p64, age, 58.0).
symptom(p64, chest_pain_type, 2.0).
symptom(p64, resting_blood_pressure, 140.0).
symptom(p64, cholesterol, 211.0).
symptom(p64, exercise_induced_angina, 0.0).
symptom(p64, st_depression, 0.0).
symptom(p64, st_slope, 2.0).
symptom(p64, num_major_vessels, 0.0).
symptom(p64, thalassemia, 2.0).

symptom(p65, age, 35.0).
symptom(p65, chest_pain_type, 0.0).
symptom(p65, resting_blood_pressure, 138.0).
symptom(p65, cholesterol, 183.0).
symptom(p65, exercise_induced_angina, 0.0).
symptom(p65, st_depression, 1.4).
symptom(p65, st_slope, 2.0).
symptom(p65, num_major_vessels, 0.0).
symptom(p65, thalassemia, 2.0).

symptom(p66, age, 51.0).
symptom(p66, chest_pain_type, 2.0).
symptom(p66, resting_blood_pressure, 100.0).
symptom(p66, cholesterol, 222.0).
symptom(p66, exercise_induced_angina, 1.0).
symptom(p66, st_depression, 1.2).
symptom(p66, st_slope, 1.0).
symptom(p66, num_major_vessels, 0.0).
symptom(p66, thalassemia, 2.0).

symptom(p67, age, 45.0).
symptom(p67, chest_pain_type, 1.0).
symptom(p67, resting_blood_pressure, 130.0).
symptom(p67, cholesterol, 234.0).
symptom(p67, exercise_induced_angina, 0.0).
symptom(p67, st_depression, 0.6).
symptom(p67, st_slope, 1.0).
symptom(p67, num_major_vessels, 0.0).
symptom(p67, thalassemia, 2.0).

symptom(p68, age, 44.0).
symptom(p68, chest_pain_type, 1.0).
symptom(p68, resting_blood_pressure, 120.0).
symptom(p68, cholesterol, 220.0).
symptom(p68, exercise_induced_angina, 0.0).
symptom(p68, st_depression, 0.0).
symptom(p68, st_slope, 2.0).
symptom(p68, num_major_vessels, 0.0).
symptom(p68, thalassemia, 2.0).

symptom(p69, age, 62.0).
symptom(p69, chest_pain_type, 0.0).
symptom(p69, resting_blood_pressure, 124.0).
symptom(p69, cholesterol, 209.0).
symptom(p69, exercise_induced_angina, 0.0).
symptom(p69, st_depression, 0.0).
symptom(p69, st_slope, 2.0).
symptom(p69, num_major_vessels, 0.0).
symptom(p69, thalassemia, 2.0).

symptom(p70, age, 54.0).
symptom(p70, chest_pain_type, 2.0).
symptom(p70, resting_blood_pressure, 120.0).
symptom(p70, cholesterol, 258.0).
symptom(p70, exercise_induced_angina, 0.0).
symptom(p70, st_depression, 0.4).
symptom(p70, st_slope, 1.0).
symptom(p70, num_major_vessels, 0.0).
symptom(p70, thalassemia, 3.0).

symptom(p71, age, 51.0).
symptom(p71, chest_pain_type, 2.0).
symptom(p71, resting_blood_pressure, 94.0).
symptom(p71, cholesterol, 227.0).
symptom(p71, exercise_induced_angina, 1.0).
symptom(p71, st_depression, 0.0).
symptom(p71, st_slope, 2.0).
symptom(p71, num_major_vessels, 1.0).
symptom(p71, thalassemia, 3.0).

symptom(p72, age, 29.0).
symptom(p72, chest_pain_type, 1.0).
symptom(p72, resting_blood_pressure, 130.0).
symptom(p72, cholesterol, 204.0).
symptom(p72, exercise_induced_angina, 0.0).
symptom(p72, st_depression, 0.0).
symptom(p72, st_slope, 2.0).
symptom(p72, num_major_vessels, 0.0).
symptom(p72, thalassemia, 2.0).

symptom(p73, age, 51.0).
symptom(p73, chest_pain_type, 0.0).
symptom(p73, resting_blood_pressure, 140.0).
symptom(p73, cholesterol, 261.0).
symptom(p73, exercise_induced_angina, 1.0).
symptom(p73, st_depression, 0.0).
symptom(p73, st_slope, 2.0).
symptom(p73, num_major_vessels, 0.0).
symptom(p73, thalassemia, 2.0).

symptom(p74, age, 43.0).
symptom(p74, chest_pain_type, 2.0).
symptom(p74, resting_blood_pressure, 122.0).
symptom(p74, cholesterol, 213.0).
symptom(p74, exercise_induced_angina, 0.0).
symptom(p74, st_depression, 0.2).
symptom(p74, st_slope, 1.0).
symptom(p74, num_major_vessels, 0.0).
symptom(p74, thalassemia, 2.0).

symptom(p75, age, 55.0).
symptom(p75, chest_pain_type, 1.0).
symptom(p75, resting_blood_pressure, 135.0).
symptom(p75, cholesterol, 250.0).
symptom(p75, exercise_induced_angina, 0.0).
symptom(p75, st_depression, 1.4).
symptom(p75, st_slope, 1.0).
symptom(p75, num_major_vessels, 0.0).
symptom(p75, thalassemia, 2.0).

symptom(p76, age, 51.0).
symptom(p76, chest_pain_type, 2.0).
symptom(p76, resting_blood_pressure, 125.0).
symptom(p76, cholesterol, 245.0).
symptom(p76, exercise_induced_angina, 0.0).
symptom(p76, st_depression, 2.4).
symptom(p76, st_slope, 1.0).
symptom(p76, num_major_vessels, 0.0).
symptom(p76, thalassemia, 2.0).

symptom(p77, age, 59.0).
symptom(p77, chest_pain_type, 1.0).
symptom(p77, resting_blood_pressure, 140.0).
symptom(p77, cholesterol, 221.0).
symptom(p77, exercise_induced_angina, 1.0).
symptom(p77, st_depression, 0.0).
symptom(p77, st_slope, 2.0).
symptom(p77, num_major_vessels, 0.0).
symptom(p77, thalassemia, 2.0).

symptom(p78, age, 52.0).
symptom(p78, chest_pain_type, 1.0).
symptom(p78, resting_blood_pressure, 128.0).
symptom(p78, cholesterol, 205.0).
symptom(p78, exercise_induced_angina, 0.0).
symptom(p78, st_depression, 0.0).
symptom(p78, st_slope, 2.0).
symptom(p78, num_major_vessels, 0.0).
symptom(p78, thalassemia, 2.0).

symptom(p79, age, 58.0).
symptom(p79, chest_pain_type, 2.0).
symptom(p79, resting_blood_pressure, 105.0).
symptom(p79, cholesterol, 240.0).
symptom(p79, exercise_induced_angina, 1.0).
symptom(p79, st_depression, 0.6).
symptom(p79, st_slope, 1.0).
symptom(p79, num_major_vessels, 0.0).
symptom(p79, thalassemia, 3.0).

symptom(p80, age, 41.0).
symptom(p80, chest_pain_type, 2.0).
symptom(p80, resting_blood_pressure, 112.0).
symptom(p80, cholesterol, 250.0).
symptom(p80, exercise_induced_angina, 0.0).
symptom(p80, st_depression, 0.0).
symptom(p80, st_slope, 2.0).
symptom(p80, num_major_vessels, 0.0).
symptom(p80, thalassemia, 2.0).

symptom(p81, age, 45.0).
symptom(p81, chest_pain_type, 1.0).
symptom(p81, resting_blood_pressure, 128.0).
symptom(p81, cholesterol, 308.0).
symptom(p81, exercise_induced_angina, 0.0).
symptom(p81, st_depression, 0.0).
symptom(p81, st_slope, 2.0).
symptom(p81, num_major_vessels, 0.0).
symptom(p81, thalassemia, 2.0).

symptom(p82, age, 60.0).
symptom(p82, chest_pain_type, 2.0).
symptom(p82, resting_blood_pressure, 102.0).
symptom(p82, cholesterol, 318.0).
symptom(p82, exercise_induced_angina, 0.0).
symptom(p82, st_depression, 0.0).
symptom(p82, st_slope, 2.0).
symptom(p82, num_major_vessels, 1.0).
symptom(p82, thalassemia, 2.0).

symptom(p83, age, 52.0).
symptom(p83, chest_pain_type, 3.0).
symptom(p83, resting_blood_pressure, 152.0).
symptom(p83, cholesterol, 298.0).
symptom(p83, exercise_induced_angina, 0.0).
symptom(p83, st_depression, 1.2).
symptom(p83, st_slope, 1.0).
symptom(p83, num_major_vessels, 0.0).
symptom(p83, thalassemia, 3.0).

symptom(p84, age, 42.0).
symptom(p84, chest_pain_type, 0.0).
symptom(p84, resting_blood_pressure, 102.0).
symptom(p84, cholesterol, 265.0).
symptom(p84, exercise_induced_angina, 0.0).
symptom(p84, st_depression, 0.6).
symptom(p84, st_slope, 1.0).
symptom(p84, num_major_vessels, 0.0).
symptom(p84, thalassemia, 2.0).

symptom(p85, age, 67.0).
symptom(p85, chest_pain_type, 2.0).
symptom(p85, resting_blood_pressure, 115.0).
symptom(p85, cholesterol, 564.0).
symptom(p85, exercise_induced_angina, 0.0).
symptom(p85, st_depression, 1.6).
symptom(p85, st_slope, 1.0).
symptom(p85, num_major_vessels, 0.0).
symptom(p85, thalassemia, 3.0).

symptom(p86, age, 68.0).
symptom(p86, chest_pain_type, 2.0).
symptom(p86, resting_blood_pressure, 118.0).
symptom(p86, cholesterol, 277.0).
symptom(p86, exercise_induced_angina, 0.0).
symptom(p86, st_depression, 1.0).
symptom(p86, st_slope, 2.0).
symptom(p86, num_major_vessels, 1.0).
symptom(p86, thalassemia, 3.0).

symptom(p87, age, 46.0).
symptom(p87, chest_pain_type, 1.0).
symptom(p87, resting_blood_pressure, 101.0).
symptom(p87, cholesterol, 197.0).
symptom(p87, exercise_induced_angina, 0.0).
symptom(p87, st_depression, 0.0).
symptom(p87, st_slope, 2.0).
symptom(p87, num_major_vessels, 0.0).
symptom(p87, thalassemia, 3.0).

symptom(p88, age, 54.0).
symptom(p88, chest_pain_type, 2.0).
symptom(p88, resting_blood_pressure, 110.0).
symptom(p88, cholesterol, 214.0).
symptom(p88, exercise_induced_angina, 0.0).
symptom(p88, st_depression, 1.6).
symptom(p88, st_slope, 1.0).
symptom(p88, num_major_vessels, 0.0).
symptom(p88, thalassemia, 2.0).

symptom(p89, age, 58.0).
symptom(p89, chest_pain_type, 0.0).
symptom(p89, resting_blood_pressure, 100.0).
symptom(p89, cholesterol, 248.0).
symptom(p89, exercise_induced_angina, 0.0).
symptom(p89, st_depression, 1.0).
symptom(p89, st_slope, 1.0).
symptom(p89, num_major_vessels, 0.0).
symptom(p89, thalassemia, 2.0).

symptom(p90, age, 48.0).
symptom(p90, chest_pain_type, 2.0).
symptom(p90, resting_blood_pressure, 124.0).
symptom(p90, cholesterol, 255.0).
symptom(p90, exercise_induced_angina, 0.0).
symptom(p90, st_depression, 0.0).
symptom(p90, st_slope, 2.0).
symptom(p90, num_major_vessels, 2.0).
symptom(p90, thalassemia, 2.0).

symptom(p91, age, 57.0).
symptom(p91, chest_pain_type, 0.0).
symptom(p91, resting_blood_pressure, 132.0).
symptom(p91, cholesterol, 207.0).
symptom(p91, exercise_induced_angina, 1.0).
symptom(p91, st_depression, 0.0).
symptom(p91, st_slope, 2.0).
symptom(p91, num_major_vessels, 0.0).
symptom(p91, thalassemia, 3.0).

symptom(p92, age, 52.0).
symptom(p92, chest_pain_type, 2.0).
symptom(p92, resting_blood_pressure, 138.0).
symptom(p92, cholesterol, 223.0).
symptom(p92, exercise_induced_angina, 0.0).
symptom(p92, st_depression, 0.0).
symptom(p92, st_slope, 2.0).
symptom(p92, num_major_vessels, 4.0).
symptom(p92, thalassemia, 2.0).

symptom(p93, age, 54.0).
symptom(p93, chest_pain_type, 1.0).
symptom(p93, resting_blood_pressure, 132.0).
symptom(p93, cholesterol, 288.0).
symptom(p93, exercise_induced_angina, 1.0).
symptom(p93, st_depression, 0.0).
symptom(p93, st_slope, 2.0).
symptom(p93, num_major_vessels, 1.0).
symptom(p93, thalassemia, 2.0).

symptom(p94, age, 45.0).
symptom(p94, chest_pain_type, 1.0).
symptom(p94, resting_blood_pressure, 112.0).
symptom(p94, cholesterol, 160.0).
symptom(p94, exercise_induced_angina, 0.0).
symptom(p94, st_depression, 0.0).
symptom(p94, st_slope, 1.0).
symptom(p94, num_major_vessels, 0.0).
symptom(p94, thalassemia, 2.0).

symptom(p95, age, 53.0).
symptom(p95, chest_pain_type, 0.0).
symptom(p95, resting_blood_pressure, 142.0).
symptom(p95, cholesterol, 226.0).
symptom(p95, exercise_induced_angina, 1.0).
symptom(p95, st_depression, 0.0).
symptom(p95, st_slope, 2.0).
symptom(p95, num_major_vessels, 0.0).
symptom(p95, thalassemia, 3.0).

symptom(p96, age, 62.0).
symptom(p96, chest_pain_type, 0.0).
symptom(p96, resting_blood_pressure, 140.0).
symptom(p96, cholesterol, 394.0).
symptom(p96, exercise_induced_angina, 0.0).
symptom(p96, st_depression, 1.2).
symptom(p96, st_slope, 1.0).
symptom(p96, num_major_vessels, 0.0).
symptom(p96, thalassemia, 2.0).

symptom(p97, age, 52.0).
symptom(p97, chest_pain_type, 0.0).
symptom(p97, resting_blood_pressure, 108.0).
symptom(p97, cholesterol, 233.0).
symptom(p97, exercise_induced_angina, 0.0).
symptom(p97, st_depression, 0.1).
symptom(p97, st_slope, 2.0).
symptom(p97, num_major_vessels, 3.0).
symptom(p97, thalassemia, 3.0).

symptom(p98, age, 43.0).
symptom(p98, chest_pain_type, 2.0).
symptom(p98, resting_blood_pressure, 130.0).
symptom(p98, cholesterol, 315.0).
symptom(p98, exercise_induced_angina, 0.0).
symptom(p98, st_depression, 1.9).
symptom(p98, st_slope, 2.0).
symptom(p98, num_major_vessels, 1.0).
symptom(p98, thalassemia, 2.0).

symptom(p99, age, 53.0).
symptom(p99, chest_pain_type, 2.0).
symptom(p99, resting_blood_pressure, 130.0).
symptom(p99, cholesterol, 246.0).
symptom(p99, exercise_induced_angina, 0.0).
symptom(p99, st_depression, 0.0).
symptom(p99, st_slope, 2.0).
symptom(p99, num_major_vessels, 3.0).
symptom(p99, thalassemia, 2.0).

symptom(p100, age, 42.0).
symptom(p100, chest_pain_type, 3.0).
symptom(p100, resting_blood_pressure, 148.0).
symptom(p100, cholesterol, 244.0).
symptom(p100, exercise_induced_angina, 0.0).
symptom(p100, st_depression, 0.8).
symptom(p100, st_slope, 2.0).
symptom(p100, num_major_vessels, 2.0).
symptom(p100, thalassemia, 2.0).

symptom(p101, age, 59.0).
symptom(p101, chest_pain_type, 3.0).
symptom(p101, resting_blood_pressure, 178.0).
symptom(p101, cholesterol, 270.0).
symptom(p101, exercise_induced_angina, 0.0).
symptom(p101, st_depression, 4.2).
symptom(p101, st_slope, 0.0).
symptom(p101, num_major_vessels, 0.0).
symptom(p101, thalassemia, 3.0).

symptom(p102, age, 63.0).
symptom(p102, chest_pain_type, 1.0).
symptom(p102, resting_blood_pressure, 140.0).
symptom(p102, cholesterol, 195.0).
symptom(p102, exercise_induced_angina, 0.0).
symptom(p102, st_depression, 0.0).
symptom(p102, st_slope, 2.0).
symptom(p102, num_major_vessels, 2.0).
symptom(p102, thalassemia, 2.0).

symptom(p103, age, 42.0).
symptom(p103, chest_pain_type, 2.0).
symptom(p103, resting_blood_pressure, 120.0).
symptom(p103, cholesterol, 240.0).
symptom(p103, exercise_induced_angina, 0.0).
symptom(p103, st_depression, 0.8).
symptom(p103, st_slope, 0.0).
symptom(p103, num_major_vessels, 0.0).
symptom(p103, thalassemia, 3.0).

symptom(p104, age, 50.0).
symptom(p104, chest_pain_type, 2.0).
symptom(p104, resting_blood_pressure, 129.0).
symptom(p104, cholesterol, 196.0).
symptom(p104, exercise_induced_angina, 0.0).
symptom(p104, st_depression, 0.0).
symptom(p104, st_slope, 2.0).
symptom(p104, num_major_vessels, 0.0).
symptom(p104, thalassemia, 2.0).

symptom(p105, age, 68.0).
symptom(p105, chest_pain_type, 2.0).
symptom(p105, resting_blood_pressure, 120.0).
symptom(p105, cholesterol, 211.0).
symptom(p105, exercise_induced_angina, 0.0).
symptom(p105, st_depression, 1.5).
symptom(p105, st_slope, 1.0).
symptom(p105, num_major_vessels, 0.0).
symptom(p105, thalassemia, 2.0).

symptom(p106, age, 69.0).
symptom(p106, chest_pain_type, 3.0).
symptom(p106, resting_blood_pressure, 160.0).
symptom(p106, cholesterol, 234.0).
symptom(p106, exercise_induced_angina, 0.0).
symptom(p106, st_depression, 0.1).
symptom(p106, st_slope, 1.0).
symptom(p106, num_major_vessels, 1.0).
symptom(p106, thalassemia, 2.0).

symptom(p107, age, 45.0).
symptom(p107, chest_pain_type, 0.0).
symptom(p107, resting_blood_pressure, 138.0).
symptom(p107, cholesterol, 236.0).
symptom(p107, exercise_induced_angina, 1.0).
symptom(p107, st_depression, 0.2).
symptom(p107, st_slope, 1.0).
symptom(p107, num_major_vessels, 0.0).
symptom(p107, thalassemia, 2.0).

symptom(p108, age, 50.0).
symptom(p108, chest_pain_type, 1.0).
symptom(p108, resting_blood_pressure, 120.0).
symptom(p108, cholesterol, 244.0).
symptom(p108, exercise_induced_angina, 0.0).
symptom(p108, st_depression, 1.1).
symptom(p108, st_slope, 2.0).
symptom(p108, num_major_vessels, 0.0).
symptom(p108, thalassemia, 2.0).

symptom(p109, age, 50.0).
symptom(p109, chest_pain_type, 0.0).
symptom(p109, resting_blood_pressure, 110.0).
symptom(p109, cholesterol, 254.0).
symptom(p109, exercise_induced_angina, 0.0).
symptom(p109, st_depression, 0.0).
symptom(p109, st_slope, 2.0).
symptom(p109, num_major_vessels, 0.0).
symptom(p109, thalassemia, 2.0).

symptom(p110, age, 64.0).
symptom(p110, chest_pain_type, 0.0).
symptom(p110, resting_blood_pressure, 180.0).
symptom(p110, cholesterol, 325.0).
symptom(p110, exercise_induced_angina, 1.0).
symptom(p110, st_depression, 0.0).
symptom(p110, st_slope, 2.0).
symptom(p110, num_major_vessels, 0.0).
symptom(p110, thalassemia, 2.0).

symptom(p111, age, 57.0).
symptom(p111, chest_pain_type, 2.0).
symptom(p111, resting_blood_pressure, 150.0).
symptom(p111, cholesterol, 126.0).
symptom(p111, exercise_induced_angina, 0.0).
symptom(p111, st_depression, 0.2).
symptom(p111, st_slope, 2.0).
symptom(p111, num_major_vessels, 1.0).
symptom(p111, thalassemia, 3.0).

symptom(p112, age, 64.0).
symptom(p112, chest_pain_type, 2.0).
symptom(p112, resting_blood_pressure, 140.0).
symptom(p112, cholesterol, 313.0).
symptom(p112, exercise_induced_angina, 0.0).
symptom(p112, st_depression, 0.2).
symptom(p112, st_slope, 2.0).
symptom(p112, num_major_vessels, 0.0).
symptom(p112, thalassemia, 3.0).

symptom(p113, age, 43.0).
symptom(p113, chest_pain_type, 0.0).
symptom(p113, resting_blood_pressure, 110.0).
symptom(p113, cholesterol, 211.0).
symptom(p113, exercise_induced_angina, 0.0).
symptom(p113, st_depression, 0.0).
symptom(p113, st_slope, 2.0).
symptom(p113, num_major_vessels, 0.0).
symptom(p113, thalassemia, 3.0).

symptom(p114, age, 55.0).
symptom(p114, chest_pain_type, 1.0).
symptom(p114, resting_blood_pressure, 130.0).
symptom(p114, cholesterol, 262.0).
symptom(p114, exercise_induced_angina, 0.0).
symptom(p114, st_depression, 0.0).
symptom(p114, st_slope, 2.0).
symptom(p114, num_major_vessels, 0.0).
symptom(p114, thalassemia, 2.0).

symptom(p115, age, 37.0).
symptom(p115, chest_pain_type, 2.0).
symptom(p115, resting_blood_pressure, 120.0).
symptom(p115, cholesterol, 215.0).
symptom(p115, exercise_induced_angina, 0.0).
symptom(p115, st_depression, 0.0).
symptom(p115, st_slope, 2.0).
symptom(p115, num_major_vessels, 0.0).
symptom(p115, thalassemia, 2.0).

symptom(p116, age, 41.0).
symptom(p116, chest_pain_type, 2.0).
symptom(p116, resting_blood_pressure, 130.0).
symptom(p116, cholesterol, 214.0).
symptom(p116, exercise_induced_angina, 0.0).
symptom(p116, st_depression, 2.0).
symptom(p116, st_slope, 1.0).
symptom(p116, num_major_vessels, 0.0).
symptom(p116, thalassemia, 2.0).

symptom(p117, age, 56.0).
symptom(p117, chest_pain_type, 3.0).
symptom(p117, resting_blood_pressure, 120.0).
symptom(p117, cholesterol, 193.0).
symptom(p117, exercise_induced_angina, 0.0).
symptom(p117, st_depression, 1.9).
symptom(p117, st_slope, 1.0).
symptom(p117, num_major_vessels, 0.0).
symptom(p117, thalassemia, 3.0).

symptom(p118, age, 46.0).
symptom(p118, chest_pain_type, 1.0).
symptom(p118, resting_blood_pressure, 105.0).
symptom(p118, cholesterol, 204.0).
symptom(p118, exercise_induced_angina, 0.0).
symptom(p118, st_depression, 0.0).
symptom(p118, st_slope, 2.0).
symptom(p118, num_major_vessels, 0.0).
symptom(p118, thalassemia, 2.0).

symptom(p119, age, 46.0).
symptom(p119, chest_pain_type, 0.0).
symptom(p119, resting_blood_pressure, 138.0).
symptom(p119, cholesterol, 243.0).
symptom(p119, exercise_induced_angina, 1.0).
symptom(p119, st_depression, 0.0).
symptom(p119, st_slope, 1.0).
symptom(p119, num_major_vessels, 0.0).
symptom(p119, thalassemia, 2.0).

symptom(p120, age, 64.0).
symptom(p120, chest_pain_type, 0.0).
symptom(p120, resting_blood_pressure, 130.0).
symptom(p120, cholesterol, 303.0).
symptom(p120, exercise_induced_angina, 0.0).
symptom(p120, st_depression, 2.0).
symptom(p120, st_slope, 1.0).
symptom(p120, num_major_vessels, 2.0).
symptom(p120, thalassemia, 2.0).

symptom(p121, age, 59.0).
symptom(p121, chest_pain_type, 0.0).
symptom(p121, resting_blood_pressure, 138.0).
symptom(p121, cholesterol, 271.0).
symptom(p121, exercise_induced_angina, 0.0).
symptom(p121, st_depression, 0.0).
symptom(p121, st_slope, 2.0).
symptom(p121, num_major_vessels, 0.0).
symptom(p121, thalassemia, 2.0).

symptom(p122, age, 41.0).
symptom(p122, chest_pain_type, 2.0).
symptom(p122, resting_blood_pressure, 112.0).
symptom(p122, cholesterol, 268.0).
symptom(p122, exercise_induced_angina, 1.0).
symptom(p122, st_depression, 0.0).
symptom(p122, st_slope, 2.0).
symptom(p122, num_major_vessels, 0.0).
symptom(p122, thalassemia, 2.0).

symptom(p123, age, 54.0).
symptom(p123, chest_pain_type, 2.0).
symptom(p123, resting_blood_pressure, 108.0).
symptom(p123, cholesterol, 267.0).
symptom(p123, exercise_induced_angina, 0.0).
symptom(p123, st_depression, 0.0).
symptom(p123, st_slope, 2.0).
symptom(p123, num_major_vessels, 0.0).
symptom(p123, thalassemia, 2.0).

symptom(p124, age, 39.0).
symptom(p124, chest_pain_type, 2.0).
symptom(p124, resting_blood_pressure, 94.0).
symptom(p124, cholesterol, 199.0).
symptom(p124, exercise_induced_angina, 0.0).
symptom(p124, st_depression, 0.0).
symptom(p124, st_slope, 2.0).
symptom(p124, num_major_vessels, 0.0).
symptom(p124, thalassemia, 2.0).

symptom(p125, age, 34.0).
symptom(p125, chest_pain_type, 1.0).
symptom(p125, resting_blood_pressure, 118.0).
symptom(p125, cholesterol, 210.0).
symptom(p125, exercise_induced_angina, 0.0).
symptom(p125, st_depression, 0.7).
symptom(p125, st_slope, 2.0).
symptom(p125, num_major_vessels, 0.0).
symptom(p125, thalassemia, 2.0).

symptom(p126, age, 47.0).
symptom(p126, chest_pain_type, 0.0).
symptom(p126, resting_blood_pressure, 112.0).
symptom(p126, cholesterol, 204.0).
symptom(p126, exercise_induced_angina, 0.0).
symptom(p126, st_depression, 0.1).
symptom(p126, st_slope, 2.0).
symptom(p126, num_major_vessels, 0.0).
symptom(p126, thalassemia, 2.0).

symptom(p127, age, 67.0).
symptom(p127, chest_pain_type, 2.0).
symptom(p127, resting_blood_pressure, 152.0).
symptom(p127, cholesterol, 277.0).
symptom(p127, exercise_induced_angina, 0.0).
symptom(p127, st_depression, 0.0).
symptom(p127, st_slope, 2.0).
symptom(p127, num_major_vessels, 1.0).
symptom(p127, thalassemia, 2.0).

symptom(p128, age, 52.0).
symptom(p128, chest_pain_type, 2.0).
symptom(p128, resting_blood_pressure, 136.0).
symptom(p128, cholesterol, 196.0).
symptom(p128, exercise_induced_angina, 0.0).
symptom(p128, st_depression, 0.1).
symptom(p128, st_slope, 1.0).
symptom(p128, num_major_vessels, 0.0).
symptom(p128, thalassemia, 2.0).

symptom(p129, age, 74.0).
symptom(p129, chest_pain_type, 1.0).
symptom(p129, resting_blood_pressure, 120.0).
symptom(p129, cholesterol, 269.0).
symptom(p129, exercise_induced_angina, 1.0).
symptom(p129, st_depression, 0.2).
symptom(p129, st_slope, 2.0).
symptom(p129, num_major_vessels, 1.0).
symptom(p129, thalassemia, 2.0).

symptom(p130, age, 54.0).
symptom(p130, chest_pain_type, 2.0).
symptom(p130, resting_blood_pressure, 160.0).
symptom(p130, cholesterol, 201.0).
symptom(p130, exercise_induced_angina, 0.0).
symptom(p130, st_depression, 0.0).
symptom(p130, st_slope, 2.0).
symptom(p130, num_major_vessels, 1.0).
symptom(p130, thalassemia, 2.0).

symptom(p131, age, 49.0).
symptom(p131, chest_pain_type, 1.0).
symptom(p131, resting_blood_pressure, 134.0).
symptom(p131, cholesterol, 271.0).
symptom(p131, exercise_induced_angina, 0.0).
symptom(p131, st_depression, 0.0).
symptom(p131, st_slope, 1.0).
symptom(p131, num_major_vessels, 0.0).
symptom(p131, thalassemia, 2.0).

symptom(p132, age, 42.0).
symptom(p132, chest_pain_type, 1.0).
symptom(p132, resting_blood_pressure, 120.0).
symptom(p132, cholesterol, 295.0).
symptom(p132, exercise_induced_angina, 0.0).
symptom(p132, st_depression, 0.0).
symptom(p132, st_slope, 2.0).
symptom(p132, num_major_vessels, 0.0).
symptom(p132, thalassemia, 2.0).

symptom(p133, age, 41.0).
symptom(p133, chest_pain_type, 1.0).
symptom(p133, resting_blood_pressure, 110.0).
symptom(p133, cholesterol, 235.0).
symptom(p133, exercise_induced_angina, 0.0).
symptom(p133, st_depression, 0.0).
symptom(p133, st_slope, 2.0).
symptom(p133, num_major_vessels, 0.0).
symptom(p133, thalassemia, 2.0).

symptom(p134, age, 41.0).
symptom(p134, chest_pain_type, 1.0).
symptom(p134, resting_blood_pressure, 126.0).
symptom(p134, cholesterol, 306.0).
symptom(p134, exercise_induced_angina, 0.0).
symptom(p134, st_depression, 0.0).
symptom(p134, st_slope, 2.0).
symptom(p134, num_major_vessels, 0.0).
symptom(p134, thalassemia, 2.0).

symptom(p135, age, 49.0).
symptom(p135, chest_pain_type, 0.0).
symptom(p135, resting_blood_pressure, 130.0).
symptom(p135, cholesterol, 269.0).
symptom(p135, exercise_induced_angina, 0.0).
symptom(p135, st_depression, 0.0).
symptom(p135, st_slope, 2.0).
symptom(p135, num_major_vessels, 0.0).
symptom(p135, thalassemia, 2.0).

symptom(p136, age, 60.0).
symptom(p136, chest_pain_type, 2.0).
symptom(p136, resting_blood_pressure, 120.0).
symptom(p136, cholesterol, 178.0).
symptom(p136, exercise_induced_angina, 0.0).
symptom(p136, st_depression, 0.0).
symptom(p136, st_slope, 2.0).
symptom(p136, num_major_vessels, 0.0).
symptom(p136, thalassemia, 2.0).

symptom(p137, age, 62.0).
symptom(p137, chest_pain_type, 1.0).
symptom(p137, resting_blood_pressure, 128.0).
symptom(p137, cholesterol, 208.0).
symptom(p137, exercise_induced_angina, 0.0).
symptom(p137, st_depression, 0.0).
symptom(p137, st_slope, 2.0).
symptom(p137, num_major_vessels, 0.0).
symptom(p137, thalassemia, 2.0).

symptom(p138, age, 57.0).
symptom(p138, chest_pain_type, 0.0).
symptom(p138, resting_blood_pressure, 110.0).
symptom(p138, cholesterol, 201.0).
symptom(p138, exercise_induced_angina, 1.0).
symptom(p138, st_depression, 1.5).
symptom(p138, st_slope, 1.0).
symptom(p138, num_major_vessels, 0.0).
symptom(p138, thalassemia, 1.0).

symptom(p139, age, 64.0).
symptom(p139, chest_pain_type, 0.0).
symptom(p139, resting_blood_pressure, 128.0).
symptom(p139, cholesterol, 263.0).
symptom(p139, exercise_induced_angina, 1.0).
symptom(p139, st_depression, 0.2).
symptom(p139, st_slope, 1.0).
symptom(p139, num_major_vessels, 1.0).
symptom(p139, thalassemia, 3.0).

symptom(p140, age, 51.0).
symptom(p140, chest_pain_type, 2.0).
symptom(p140, resting_blood_pressure, 120.0).
symptom(p140, cholesterol, 295.0).
symptom(p140, exercise_induced_angina, 0.0).
symptom(p140, st_depression, 0.6).
symptom(p140, st_slope, 2.0).
symptom(p140, num_major_vessels, 0.0).
symptom(p140, thalassemia, 2.0).

symptom(p141, age, 43.0).
symptom(p141, chest_pain_type, 0.0).
symptom(p141, resting_blood_pressure, 115.0).
symptom(p141, cholesterol, 303.0).
symptom(p141, exercise_induced_angina, 0.0).
symptom(p141, st_depression, 1.2).
symptom(p141, st_slope, 1.0).
symptom(p141, num_major_vessels, 0.0).
symptom(p141, thalassemia, 2.0).

symptom(p142, age, 42.0).
symptom(p142, chest_pain_type, 2.0).
symptom(p142, resting_blood_pressure, 120.0).
symptom(p142, cholesterol, 209.0).
symptom(p142, exercise_induced_angina, 0.0).
symptom(p142, st_depression, 0.0).
symptom(p142, st_slope, 1.0).
symptom(p142, num_major_vessels, 0.0).
symptom(p142, thalassemia, 2.0).

symptom(p143, age, 67.0).
symptom(p143, chest_pain_type, 0.0).
symptom(p143, resting_blood_pressure, 106.0).
symptom(p143, cholesterol, 223.0).
symptom(p143, exercise_induced_angina, 0.0).
symptom(p143, st_depression, 0.3).
symptom(p143, st_slope, 2.0).
symptom(p143, num_major_vessels, 2.0).
symptom(p143, thalassemia, 2.0).

symptom(p144, age, 76.0).
symptom(p144, chest_pain_type, 2.0).
symptom(p144, resting_blood_pressure, 140.0).
symptom(p144, cholesterol, 197.0).
symptom(p144, exercise_induced_angina, 0.0).
symptom(p144, st_depression, 1.1).
symptom(p144, st_slope, 1.0).
symptom(p144, num_major_vessels, 0.0).
symptom(p144, thalassemia, 2.0).

symptom(p145, age, 70.0).
symptom(p145, chest_pain_type, 1.0).
symptom(p145, resting_blood_pressure, 156.0).
symptom(p145, cholesterol, 245.0).
symptom(p145, exercise_induced_angina, 0.0).
symptom(p145, st_depression, 0.0).
symptom(p145, st_slope, 2.0).
symptom(p145, num_major_vessels, 0.0).
symptom(p145, thalassemia, 2.0).

symptom(p146, age, 44.0).
symptom(p146, chest_pain_type, 2.0).
symptom(p146, resting_blood_pressure, 118.0).
symptom(p146, cholesterol, 242.0).
symptom(p146, exercise_induced_angina, 0.0).
symptom(p146, st_depression, 0.3).
symptom(p146, st_slope, 1.0).
symptom(p146, num_major_vessels, 1.0).
symptom(p146, thalassemia, 2.0).

symptom(p147, age, 60.0).
symptom(p147, chest_pain_type, 3.0).
symptom(p147, resting_blood_pressure, 150.0).
symptom(p147, cholesterol, 240.0).
symptom(p147, exercise_induced_angina, 0.0).
symptom(p147, st_depression, 0.9).
symptom(p147, st_slope, 2.0).
symptom(p147, num_major_vessels, 0.0).
symptom(p147, thalassemia, 2.0).

symptom(p148, age, 44.0).
symptom(p148, chest_pain_type, 2.0).
symptom(p148, resting_blood_pressure, 120.0).
symptom(p148, cholesterol, 226.0).
symptom(p148, exercise_induced_angina, 0.0).
symptom(p148, st_depression, 0.0).
symptom(p148, st_slope, 2.0).
symptom(p148, num_major_vessels, 0.0).
symptom(p148, thalassemia, 2.0).

symptom(p149, age, 42.0).
symptom(p149, chest_pain_type, 2.0).
symptom(p149, resting_blood_pressure, 130.0).
symptom(p149, cholesterol, 180.0).
symptom(p149, exercise_induced_angina, 0.0).
symptom(p149, st_depression, 0.0).
symptom(p149, st_slope, 2.0).
symptom(p149, num_major_vessels, 0.0).
symptom(p149, thalassemia, 2.0).

symptom(p150, age, 66.0).
symptom(p150, chest_pain_type, 0.0).
symptom(p150, resting_blood_pressure, 160.0).
symptom(p150, cholesterol, 228.0).
symptom(p150, exercise_induced_angina, 0.0).
symptom(p150, st_depression, 2.3).
symptom(p150, st_slope, 2.0).
symptom(p150, num_major_vessels, 0.0).
symptom(p150, thalassemia, 1.0).

symptom(p151, age, 71.0).
symptom(p151, chest_pain_type, 0.0).
symptom(p151, resting_blood_pressure, 112.0).
symptom(p151, cholesterol, 149.0).
symptom(p151, exercise_induced_angina, 0.0).
symptom(p151, st_depression, 1.6).
symptom(p151, st_slope, 1.0).
symptom(p151, num_major_vessels, 0.0).
symptom(p151, thalassemia, 2.0).

symptom(p152, age, 64.0).
symptom(p152, chest_pain_type, 3.0).
symptom(p152, resting_blood_pressure, 170.0).
symptom(p152, cholesterol, 227.0).
symptom(p152, exercise_induced_angina, 0.0).
symptom(p152, st_depression, 0.6).
symptom(p152, st_slope, 1.0).
symptom(p152, num_major_vessels, 0.0).
symptom(p152, thalassemia, 3.0).

symptom(p153, age, 66.0).
symptom(p153, chest_pain_type, 2.0).
symptom(p153, resting_blood_pressure, 146.0).
symptom(p153, cholesterol, 278.0).
symptom(p153, exercise_induced_angina, 0.0).
symptom(p153, st_depression, 0.0).
symptom(p153, st_slope, 1.0).
symptom(p153, num_major_vessels, 1.0).
symptom(p153, thalassemia, 2.0).

symptom(p154, age, 39.0).
symptom(p154, chest_pain_type, 2.0).
symptom(p154, resting_blood_pressure, 138.0).
symptom(p154, cholesterol, 220.0).
symptom(p154, exercise_induced_angina, 0.0).
symptom(p154, st_depression, 0.0).
symptom(p154, st_slope, 1.0).
symptom(p154, num_major_vessels, 0.0).
symptom(p154, thalassemia, 2.0).

symptom(p155, age, 58.0).
symptom(p155, chest_pain_type, 0.0).
symptom(p155, resting_blood_pressure, 130.0).
symptom(p155, cholesterol, 197.0).
symptom(p155, exercise_induced_angina, 0.0).
symptom(p155, st_depression, 0.6).
symptom(p155, st_slope, 1.0).
symptom(p155, num_major_vessels, 0.0).
symptom(p155, thalassemia, 2.0).

symptom(p156, age, 47.0).
symptom(p156, chest_pain_type, 2.0).
symptom(p156, resting_blood_pressure, 130.0).
symptom(p156, cholesterol, 253.0).
symptom(p156, exercise_induced_angina, 0.0).
symptom(p156, st_depression, 0.0).
symptom(p156, st_slope, 2.0).
symptom(p156, num_major_vessels, 0.0).
symptom(p156, thalassemia, 2.0).

symptom(p157, age, 35.0).
symptom(p157, chest_pain_type, 1.0).
symptom(p157, resting_blood_pressure, 122.0).
symptom(p157, cholesterol, 192.0).
symptom(p157, exercise_induced_angina, 0.0).
symptom(p157, st_depression, 0.0).
symptom(p157, st_slope, 2.0).
symptom(p157, num_major_vessels, 0.0).
symptom(p157, thalassemia, 2.0).

symptom(p158, age, 58.0).
symptom(p158, chest_pain_type, 1.0).
symptom(p158, resting_blood_pressure, 125.0).
symptom(p158, cholesterol, 220.0).
symptom(p158, exercise_induced_angina, 0.0).
symptom(p158, st_depression, 0.4).
symptom(p158, st_slope, 1.0).
symptom(p158, num_major_vessels, 4.0).
symptom(p158, thalassemia, 3.0).

symptom(p159, age, 56.0).
symptom(p159, chest_pain_type, 1.0).
symptom(p159, resting_blood_pressure, 130.0).
symptom(p159, cholesterol, 221.0).
symptom(p159, exercise_induced_angina, 0.0).
symptom(p159, st_depression, 0.0).
symptom(p159, st_slope, 2.0).
symptom(p159, num_major_vessels, 0.0).
symptom(p159, thalassemia, 3.0).

symptom(p160, age, 56.0).
symptom(p160, chest_pain_type, 1.0).
symptom(p160, resting_blood_pressure, 120.0).
symptom(p160, cholesterol, 240.0).
symptom(p160, exercise_induced_angina, 0.0).
symptom(p160, st_depression, 0.0).
symptom(p160, st_slope, 0.0).
symptom(p160, num_major_vessels, 0.0).
symptom(p160, thalassemia, 2.0).

symptom(p161, age, 55.0).
symptom(p161, chest_pain_type, 1.0).
symptom(p161, resting_blood_pressure, 132.0).
symptom(p161, cholesterol, 342.0).
symptom(p161, exercise_induced_angina, 0.0).
symptom(p161, st_depression, 1.2).
symptom(p161, st_slope, 2.0).
symptom(p161, num_major_vessels, 0.0).
symptom(p161, thalassemia, 2.0).

symptom(p162, age, 41.0).
symptom(p162, chest_pain_type, 1.0).
symptom(p162, resting_blood_pressure, 120.0).
symptom(p162, cholesterol, 157.0).
symptom(p162, exercise_induced_angina, 0.0).
symptom(p162, st_depression, 0.0).
symptom(p162, st_slope, 2.0).
symptom(p162, num_major_vessels, 0.0).
symptom(p162, thalassemia, 2.0).

symptom(p163, age, 38.0).
symptom(p163, chest_pain_type, 2.0).
symptom(p163, resting_blood_pressure, 138.0).
symptom(p163, cholesterol, 175.0).
symptom(p163, exercise_induced_angina, 0.0).
symptom(p163, st_depression, 0.0).
symptom(p163, st_slope, 2.0).
symptom(p163, num_major_vessels, 4.0).
symptom(p163, thalassemia, 2.0).

symptom(p164, age, 38.0).
symptom(p164, chest_pain_type, 2.0).
symptom(p164, resting_blood_pressure, 138.0).
symptom(p164, cholesterol, 175.0).
symptom(p164, exercise_induced_angina, 0.0).
symptom(p164, st_depression, 0.0).
symptom(p164, st_slope, 2.0).
symptom(p164, num_major_vessels, 4.0).
symptom(p164, thalassemia, 2.0).

symptom(p165, age, 67.0).
symptom(p165, chest_pain_type, 0.0).
symptom(p165, resting_blood_pressure, 160.0).
symptom(p165, cholesterol, 286.0).
symptom(p165, exercise_induced_angina, 1.0).
symptom(p165, st_depression, 1.5).
symptom(p165, st_slope, 1.0).
symptom(p165, num_major_vessels, 3.0).
symptom(p165, thalassemia, 2.0).

symptom(p166, age, 67.0).
symptom(p166, chest_pain_type, 0.0).
symptom(p166, resting_blood_pressure, 120.0).
symptom(p166, cholesterol, 229.0).
symptom(p166, exercise_induced_angina, 1.0).
symptom(p166, st_depression, 2.6).
symptom(p166, st_slope, 1.0).
symptom(p166, num_major_vessels, 2.0).
symptom(p166, thalassemia, 3.0).

symptom(p167, age, 62.0).
symptom(p167, chest_pain_type, 0.0).
symptom(p167, resting_blood_pressure, 140.0).
symptom(p167, cholesterol, 268.0).
symptom(p167, exercise_induced_angina, 0.0).
symptom(p167, st_depression, 3.6).
symptom(p167, st_slope, 0.0).
symptom(p167, num_major_vessels, 2.0).
symptom(p167, thalassemia, 2.0).

symptom(p168, age, 63.0).
symptom(p168, chest_pain_type, 0.0).
symptom(p168, resting_blood_pressure, 130.0).
symptom(p168, cholesterol, 254.0).
symptom(p168, exercise_induced_angina, 0.0).
symptom(p168, st_depression, 1.4).
symptom(p168, st_slope, 1.0).
symptom(p168, num_major_vessels, 1.0).
symptom(p168, thalassemia, 3.0).

symptom(p169, age, 53.0).
symptom(p169, chest_pain_type, 0.0).
symptom(p169, resting_blood_pressure, 140.0).
symptom(p169, cholesterol, 203.0).
symptom(p169, exercise_induced_angina, 1.0).
symptom(p169, st_depression, 3.1).
symptom(p169, st_slope, 0.0).
symptom(p169, num_major_vessels, 0.0).
symptom(p169, thalassemia, 3.0).

symptom(p170, age, 56.0).
symptom(p170, chest_pain_type, 2.0).
symptom(p170, resting_blood_pressure, 130.0).
symptom(p170, cholesterol, 256.0).
symptom(p170, exercise_induced_angina, 1.0).
symptom(p170, st_depression, 0.6).
symptom(p170, st_slope, 1.0).
symptom(p170, num_major_vessels, 1.0).
symptom(p170, thalassemia, 1.0).

symptom(p171, age, 48.0).
symptom(p171, chest_pain_type, 1.0).
symptom(p171, resting_blood_pressure, 110.0).
symptom(p171, cholesterol, 229.0).
symptom(p171, exercise_induced_angina, 0.0).
symptom(p171, st_depression, 1.0).
symptom(p171, st_slope, 0.0).
symptom(p171, num_major_vessels, 0.0).
symptom(p171, thalassemia, 3.0).

symptom(p172, age, 58.0).
symptom(p172, chest_pain_type, 1.0).
symptom(p172, resting_blood_pressure, 120.0).
symptom(p172, cholesterol, 284.0).
symptom(p172, exercise_induced_angina, 0.0).
symptom(p172, st_depression, 1.8).
symptom(p172, st_slope, 1.0).
symptom(p172, num_major_vessels, 0.0).
symptom(p172, thalassemia, 2.0).

symptom(p173, age, 58.0).
symptom(p173, chest_pain_type, 2.0).
symptom(p173, resting_blood_pressure, 132.0).
symptom(p173, cholesterol, 224.0).
symptom(p173, exercise_induced_angina, 0.0).
symptom(p173, st_depression, 3.2).
symptom(p173, st_slope, 2.0).
symptom(p173, num_major_vessels, 2.0).
symptom(p173, thalassemia, 3.0).

symptom(p174, age, 60.0).
symptom(p174, chest_pain_type, 0.0).
symptom(p174, resting_blood_pressure, 130.0).
symptom(p174, cholesterol, 206.0).
symptom(p174, exercise_induced_angina, 1.0).
symptom(p174, st_depression, 2.4).
symptom(p174, st_slope, 1.0).
symptom(p174, num_major_vessels, 2.0).
symptom(p174, thalassemia, 3.0).

symptom(p175, age, 40.0).
symptom(p175, chest_pain_type, 0.0).
symptom(p175, resting_blood_pressure, 110.0).
symptom(p175, cholesterol, 167.0).
symptom(p175, exercise_induced_angina, 1.0).
symptom(p175, st_depression, 2.0).
symptom(p175, st_slope, 1.0).
symptom(p175, num_major_vessels, 0.0).
symptom(p175, thalassemia, 3.0).

symptom(p176, age, 60.0).
symptom(p176, chest_pain_type, 0.0).
symptom(p176, resting_blood_pressure, 117.0).
symptom(p176, cholesterol, 230.0).
symptom(p176, exercise_induced_angina, 1.0).
symptom(p176, st_depression, 1.4).
symptom(p176, st_slope, 2.0).
symptom(p176, num_major_vessels, 2.0).
symptom(p176, thalassemia, 3.0).

symptom(p177, age, 64.0).
symptom(p177, chest_pain_type, 2.0).
symptom(p177, resting_blood_pressure, 140.0).
symptom(p177, cholesterol, 335.0).
symptom(p177, exercise_induced_angina, 0.0).
symptom(p177, st_depression, 0.0).
symptom(p177, st_slope, 2.0).
symptom(p177, num_major_vessels, 0.0).
symptom(p177, thalassemia, 2.0).

symptom(p178, age, 43.0).
symptom(p178, chest_pain_type, 0.0).
symptom(p178, resting_blood_pressure, 120.0).
symptom(p178, cholesterol, 177.0).
symptom(p178, exercise_induced_angina, 1.0).
symptom(p178, st_depression, 2.5).
symptom(p178, st_slope, 1.0).
symptom(p178, num_major_vessels, 0.0).
symptom(p178, thalassemia, 3.0).

symptom(p179, age, 57.0).
symptom(p179, chest_pain_type, 0.0).
symptom(p179, resting_blood_pressure, 150.0).
symptom(p179, cholesterol, 276.0).
symptom(p179, exercise_induced_angina, 1.0).
symptom(p179, st_depression, 0.6).
symptom(p179, st_slope, 1.0).
symptom(p179, num_major_vessels, 1.0).
symptom(p179, thalassemia, 1.0).

symptom(p180, age, 55.0).
symptom(p180, chest_pain_type, 0.0).
symptom(p180, resting_blood_pressure, 132.0).
symptom(p180, cholesterol, 353.0).
symptom(p180, exercise_induced_angina, 1.0).
symptom(p180, st_depression, 1.2).
symptom(p180, st_slope, 1.0).
symptom(p180, num_major_vessels, 1.0).
symptom(p180, thalassemia, 3.0).

symptom(p181, age, 65.0).
symptom(p181, chest_pain_type, 0.0).
symptom(p181, resting_blood_pressure, 150.0).
symptom(p181, cholesterol, 225.0).
symptom(p181, exercise_induced_angina, 0.0).
symptom(p181, st_depression, 1.0).
symptom(p181, st_slope, 1.0).
symptom(p181, num_major_vessels, 3.0).
symptom(p181, thalassemia, 3.0).

symptom(p182, age, 61.0).
symptom(p182, chest_pain_type, 0.0).
symptom(p182, resting_blood_pressure, 130.0).
symptom(p182, cholesterol, 330.0).
symptom(p182, exercise_induced_angina, 0.0).
symptom(p182, st_depression, 0.0).
symptom(p182, st_slope, 2.0).
symptom(p182, num_major_vessels, 0.0).
symptom(p182, thalassemia, 2.0).

symptom(p183, age, 58.0).
symptom(p183, chest_pain_type, 2.0).
symptom(p183, resting_blood_pressure, 112.0).
symptom(p183, cholesterol, 230.0).
symptom(p183, exercise_induced_angina, 0.0).
symptom(p183, st_depression, 2.5).
symptom(p183, st_slope, 1.0).
symptom(p183, num_major_vessels, 1.0).
symptom(p183, thalassemia, 3.0).

symptom(p184, age, 50.0).
symptom(p184, chest_pain_type, 0.0).
symptom(p184, resting_blood_pressure, 150.0).
symptom(p184, cholesterol, 243.0).
symptom(p184, exercise_induced_angina, 0.0).
symptom(p184, st_depression, 2.6).
symptom(p184, st_slope, 1.0).
symptom(p184, num_major_vessels, 0.0).
symptom(p184, thalassemia, 3.0).

symptom(p185, age, 44.0).
symptom(p185, chest_pain_type, 0.0).
symptom(p185, resting_blood_pressure, 112.0).
symptom(p185, cholesterol, 290.0).
symptom(p185, exercise_induced_angina, 0.0).
symptom(p185, st_depression, 0.0).
symptom(p185, st_slope, 2.0).
symptom(p185, num_major_vessels, 1.0).
symptom(p185, thalassemia, 2.0).

symptom(p186, age, 60.0).
symptom(p186, chest_pain_type, 0.0).
symptom(p186, resting_blood_pressure, 130.0).
symptom(p186, cholesterol, 253.0).
symptom(p186, exercise_induced_angina, 1.0).
symptom(p186, st_depression, 1.4).
symptom(p186, st_slope, 2.0).
symptom(p186, num_major_vessels, 1.0).
symptom(p186, thalassemia, 3.0).

symptom(p187, age, 54.0).
symptom(p187, chest_pain_type, 0.0).
symptom(p187, resting_blood_pressure, 124.0).
symptom(p187, cholesterol, 266.0).
symptom(p187, exercise_induced_angina, 1.0).
symptom(p187, st_depression, 2.2).
symptom(p187, st_slope, 1.0).
symptom(p187, num_major_vessels, 1.0).
symptom(p187, thalassemia, 3.0).

symptom(p188, age, 50.0).
symptom(p188, chest_pain_type, 2.0).
symptom(p188, resting_blood_pressure, 140.0).
symptom(p188, cholesterol, 233.0).
symptom(p188, exercise_induced_angina, 0.0).
symptom(p188, st_depression, 0.6).
symptom(p188, st_slope, 1.0).
symptom(p188, num_major_vessels, 1.0).
symptom(p188, thalassemia, 3.0).

symptom(p189, age, 41.0).
symptom(p189, chest_pain_type, 0.0).
symptom(p189, resting_blood_pressure, 110.0).
symptom(p189, cholesterol, 172.0).
symptom(p189, exercise_induced_angina, 0.0).
symptom(p189, st_depression, 0.0).
symptom(p189, st_slope, 2.0).
symptom(p189, num_major_vessels, 0.0).
symptom(p189, thalassemia, 3.0).

symptom(p190, age, 51.0).
symptom(p190, chest_pain_type, 0.0).
symptom(p190, resting_blood_pressure, 130.0).
symptom(p190, cholesterol, 305.0).
symptom(p190, exercise_induced_angina, 1.0).
symptom(p190, st_depression, 1.2).
symptom(p190, st_slope, 1.0).
symptom(p190, num_major_vessels, 0.0).
symptom(p190, thalassemia, 3.0).

symptom(p191, age, 58.0).
symptom(p191, chest_pain_type, 0.0).
symptom(p191, resting_blood_pressure, 128.0).
symptom(p191, cholesterol, 216.0).
symptom(p191, exercise_induced_angina, 1.0).
symptom(p191, st_depression, 2.2).
symptom(p191, st_slope, 1.0).
symptom(p191, num_major_vessels, 3.0).
symptom(p191, thalassemia, 3.0).

symptom(p192, age, 54.0).
symptom(p192, chest_pain_type, 0.0).
symptom(p192, resting_blood_pressure, 120.0).
symptom(p192, cholesterol, 188.0).
symptom(p192, exercise_induced_angina, 0.0).
symptom(p192, st_depression, 1.4).
symptom(p192, st_slope, 1.0).
symptom(p192, num_major_vessels, 1.0).
symptom(p192, thalassemia, 3.0).

symptom(p193, age, 60.0).
symptom(p193, chest_pain_type, 0.0).
symptom(p193, resting_blood_pressure, 145.0).
symptom(p193, cholesterol, 282.0).
symptom(p193, exercise_induced_angina, 1.0).
symptom(p193, st_depression, 2.8).
symptom(p193, st_slope, 1.0).
symptom(p193, num_major_vessels, 2.0).
symptom(p193, thalassemia, 3.0).

symptom(p194, age, 60.0).
symptom(p194, chest_pain_type, 2.0).
symptom(p194, resting_blood_pressure, 140.0).
symptom(p194, cholesterol, 185.0).
symptom(p194, exercise_induced_angina, 0.0).
symptom(p194, st_depression, 3.0).
symptom(p194, st_slope, 1.0).
symptom(p194, num_major_vessels, 0.0).
symptom(p194, thalassemia, 2.0).

symptom(p195, age, 59.0).
symptom(p195, chest_pain_type, 0.0).
symptom(p195, resting_blood_pressure, 170.0).
symptom(p195, cholesterol, 326.0).
symptom(p195, exercise_induced_angina, 1.0).
symptom(p195, st_depression, 3.4).
symptom(p195, st_slope, 0.0).
symptom(p195, num_major_vessels, 0.0).
symptom(p195, thalassemia, 3.0).

symptom(p196, age, 46.0).
symptom(p196, chest_pain_type, 2.0).
symptom(p196, resting_blood_pressure, 150.0).
symptom(p196, cholesterol, 231.0).
symptom(p196, exercise_induced_angina, 0.0).
symptom(p196, st_depression, 3.6).
symptom(p196, st_slope, 1.0).
symptom(p196, num_major_vessels, 0.0).
symptom(p196, thalassemia, 2.0).

symptom(p197, age, 67.0).
symptom(p197, chest_pain_type, 0.0).
symptom(p197, resting_blood_pressure, 125.0).
symptom(p197, cholesterol, 254.0).
symptom(p197, exercise_induced_angina, 0.0).
symptom(p197, st_depression, 0.2).
symptom(p197, st_slope, 1.0).
symptom(p197, num_major_vessels, 2.0).
symptom(p197, thalassemia, 3.0).

symptom(p198, age, 62.0).
symptom(p198, chest_pain_type, 0.0).
symptom(p198, resting_blood_pressure, 120.0).
symptom(p198, cholesterol, 267.0).
symptom(p198, exercise_induced_angina, 1.0).
symptom(p198, st_depression, 1.8).
symptom(p198, st_slope, 1.0).
symptom(p198, num_major_vessels, 2.0).
symptom(p198, thalassemia, 3.0).

symptom(p199, age, 65.0).
symptom(p199, chest_pain_type, 0.0).
symptom(p199, resting_blood_pressure, 110.0).
symptom(p199, cholesterol, 248.0).
symptom(p199, exercise_induced_angina, 0.0).
symptom(p199, st_depression, 0.6).
symptom(p199, st_slope, 2.0).
symptom(p199, num_major_vessels, 2.0).
symptom(p199, thalassemia, 1.0).

symptom(p200, age, 44.0).
symptom(p200, chest_pain_type, 0.0).
symptom(p200, resting_blood_pressure, 110.0).
symptom(p200, cholesterol, 197.0).
symptom(p200, exercise_induced_angina, 0.0).
symptom(p200, st_depression, 0.0).
symptom(p200, st_slope, 2.0).
symptom(p200, num_major_vessels, 1.0).
symptom(p200, thalassemia, 2.0).

symptom(p201, age, 60.0).
symptom(p201, chest_pain_type, 0.0).
symptom(p201, resting_blood_pressure, 125.0).
symptom(p201, cholesterol, 258.0).
symptom(p201, exercise_induced_angina, 1.0).
symptom(p201, st_depression, 2.8).
symptom(p201, st_slope, 1.0).
symptom(p201, num_major_vessels, 1.0).
symptom(p201, thalassemia, 3.0).

symptom(p202, age, 58.0).
symptom(p202, chest_pain_type, 0.0).
symptom(p202, resting_blood_pressure, 150.0).
symptom(p202, cholesterol, 270.0).
symptom(p202, exercise_induced_angina, 1.0).
symptom(p202, st_depression, 0.8).
symptom(p202, st_slope, 2.0).
symptom(p202, num_major_vessels, 0.0).
symptom(p202, thalassemia, 3.0).

symptom(p203, age, 68.0).
symptom(p203, chest_pain_type, 2.0).
symptom(p203, resting_blood_pressure, 180.0).
symptom(p203, cholesterol, 274.0).
symptom(p203, exercise_induced_angina, 1.0).
symptom(p203, st_depression, 1.6).
symptom(p203, st_slope, 1.0).
symptom(p203, num_major_vessels, 0.0).
symptom(p203, thalassemia, 3.0).

symptom(p204, age, 62.0).
symptom(p204, chest_pain_type, 0.0).
symptom(p204, resting_blood_pressure, 160.0).
symptom(p204, cholesterol, 164.0).
symptom(p204, exercise_induced_angina, 0.0).
symptom(p204, st_depression, 6.2).
symptom(p204, st_slope, 0.0).
symptom(p204, num_major_vessels, 3.0).
symptom(p204, thalassemia, 3.0).

symptom(p205, age, 52.0).
symptom(p205, chest_pain_type, 0.0).
symptom(p205, resting_blood_pressure, 128.0).
symptom(p205, cholesterol, 255.0).
symptom(p205, exercise_induced_angina, 1.0).
symptom(p205, st_depression, 0.0).
symptom(p205, st_slope, 2.0).
symptom(p205, num_major_vessels, 1.0).
symptom(p205, thalassemia, 3.0).

symptom(p206, age, 59.0).
symptom(p206, chest_pain_type, 0.0).
symptom(p206, resting_blood_pressure, 110.0).
symptom(p206, cholesterol, 239.0).
symptom(p206, exercise_induced_angina, 1.0).
symptom(p206, st_depression, 1.2).
symptom(p206, st_slope, 1.0).
symptom(p206, num_major_vessels, 1.0).
symptom(p206, thalassemia, 3.0).

symptom(p207, age, 60.0).
symptom(p207, chest_pain_type, 0.0).
symptom(p207, resting_blood_pressure, 150.0).
symptom(p207, cholesterol, 258.0).
symptom(p207, exercise_induced_angina, 0.0).
symptom(p207, st_depression, 2.6).
symptom(p207, st_slope, 1.0).
symptom(p207, num_major_vessels, 2.0).
symptom(p207, thalassemia, 3.0).

symptom(p208, age, 49.0).
symptom(p208, chest_pain_type, 2.0).
symptom(p208, resting_blood_pressure, 120.0).
symptom(p208, cholesterol, 188.0).
symptom(p208, exercise_induced_angina, 0.0).
symptom(p208, st_depression, 2.0).
symptom(p208, st_slope, 1.0).
symptom(p208, num_major_vessels, 3.0).
symptom(p208, thalassemia, 3.0).

symptom(p209, age, 59.0).
symptom(p209, chest_pain_type, 0.0).
symptom(p209, resting_blood_pressure, 140.0).
symptom(p209, cholesterol, 177.0).
symptom(p209, exercise_induced_angina, 1.0).
symptom(p209, st_depression, 0.0).
symptom(p209, st_slope, 2.0).
symptom(p209, num_major_vessels, 1.0).
symptom(p209, thalassemia, 3.0).

symptom(p210, age, 57.0).
symptom(p210, chest_pain_type, 2.0).
symptom(p210, resting_blood_pressure, 128.0).
symptom(p210, cholesterol, 229.0).
symptom(p210, exercise_induced_angina, 0.0).
symptom(p210, st_depression, 0.4).
symptom(p210, st_slope, 1.0).
symptom(p210, num_major_vessels, 1.0).
symptom(p210, thalassemia, 3.0).

symptom(p211, age, 61.0).
symptom(p211, chest_pain_type, 0.0).
symptom(p211, resting_blood_pressure, 120.0).
symptom(p211, cholesterol, 260.0).
symptom(p211, exercise_induced_angina, 1.0).
symptom(p211, st_depression, 3.6).
symptom(p211, st_slope, 1.0).
symptom(p211, num_major_vessels, 1.0).
symptom(p211, thalassemia, 3.0).

symptom(p212, age, 39.0).
symptom(p212, chest_pain_type, 0.0).
symptom(p212, resting_blood_pressure, 118.0).
symptom(p212, cholesterol, 219.0).
symptom(p212, exercise_induced_angina, 0.0).
symptom(p212, st_depression, 1.2).
symptom(p212, st_slope, 1.0).
symptom(p212, num_major_vessels, 0.0).
symptom(p212, thalassemia, 3.0).

symptom(p213, age, 61.0).
symptom(p213, chest_pain_type, 0.0).
symptom(p213, resting_blood_pressure, 145.0).
symptom(p213, cholesterol, 307.0).
symptom(p213, exercise_induced_angina, 1.0).
symptom(p213, st_depression, 1.0).
symptom(p213, st_slope, 1.0).
symptom(p213, num_major_vessels, 0.0).
symptom(p213, thalassemia, 3.0).

symptom(p214, age, 56.0).
symptom(p214, chest_pain_type, 0.0).
symptom(p214, resting_blood_pressure, 125.0).
symptom(p214, cholesterol, 249.0).
symptom(p214, exercise_induced_angina, 1.0).
symptom(p214, st_depression, 1.2).
symptom(p214, st_slope, 1.0).
symptom(p214, num_major_vessels, 1.0).
symptom(p214, thalassemia, 2.0).

symptom(p215, age, 43.0).
symptom(p215, chest_pain_type, 0.0).
symptom(p215, resting_blood_pressure, 132.0).
symptom(p215, cholesterol, 341.0).
symptom(p215, exercise_induced_angina, 1.0).
symptom(p215, st_depression, 3.0).
symptom(p215, st_slope, 1.0).
symptom(p215, num_major_vessels, 0.0).
symptom(p215, thalassemia, 3.0).

symptom(p216, age, 62.0).
symptom(p216, chest_pain_type, 2.0).
symptom(p216, resting_blood_pressure, 130.0).
symptom(p216, cholesterol, 263.0).
symptom(p216, exercise_induced_angina, 0.0).
symptom(p216, st_depression, 1.2).
symptom(p216, st_slope, 1.0).
symptom(p216, num_major_vessels, 1.0).
symptom(p216, thalassemia, 3.0).

symptom(p217, age, 63.0).
symptom(p217, chest_pain_type, 0.0).
symptom(p217, resting_blood_pressure, 130.0).
symptom(p217, cholesterol, 330.0).
symptom(p217, exercise_induced_angina, 1.0).
symptom(p217, st_depression, 1.8).
symptom(p217, st_slope, 2.0).
symptom(p217, num_major_vessels, 3.0).
symptom(p217, thalassemia, 3.0).

symptom(p218, age, 65.0).
symptom(p218, chest_pain_type, 0.0).
symptom(p218, resting_blood_pressure, 135.0).
symptom(p218, cholesterol, 254.0).
symptom(p218, exercise_induced_angina, 0.0).
symptom(p218, st_depression, 2.8).
symptom(p218, st_slope, 1.0).
symptom(p218, num_major_vessels, 1.0).
symptom(p218, thalassemia, 3.0).

symptom(p219, age, 48.0).
symptom(p219, chest_pain_type, 0.0).
symptom(p219, resting_blood_pressure, 130.0).
symptom(p219, cholesterol, 256.0).
symptom(p219, exercise_induced_angina, 1.0).
symptom(p219, st_depression, 0.0).
symptom(p219, st_slope, 2.0).
symptom(p219, num_major_vessels, 2.0).
symptom(p219, thalassemia, 3.0).

symptom(p220, age, 63.0).
symptom(p220, chest_pain_type, 0.0).
symptom(p220, resting_blood_pressure, 150.0).
symptom(p220, cholesterol, 407.0).
symptom(p220, exercise_induced_angina, 0.0).
symptom(p220, st_depression, 4.0).
symptom(p220, st_slope, 1.0).
symptom(p220, num_major_vessels, 3.0).
symptom(p220, thalassemia, 3.0).

symptom(p221, age, 55.0).
symptom(p221, chest_pain_type, 0.0).
symptom(p221, resting_blood_pressure, 140.0).
symptom(p221, cholesterol, 217.0).
symptom(p221, exercise_induced_angina, 1.0).
symptom(p221, st_depression, 5.6).
symptom(p221, st_slope, 0.0).
symptom(p221, num_major_vessels, 0.0).
symptom(p221, thalassemia, 3.0).

symptom(p222, age, 65.0).
symptom(p222, chest_pain_type, 3.0).
symptom(p222, resting_blood_pressure, 138.0).
symptom(p222, cholesterol, 282.0).
symptom(p222, exercise_induced_angina, 0.0).
symptom(p222, st_depression, 1.4).
symptom(p222, st_slope, 1.0).
symptom(p222, num_major_vessels, 1.0).
symptom(p222, thalassemia, 2.0).

symptom(p223, age, 56.0).
symptom(p223, chest_pain_type, 0.0).
symptom(p223, resting_blood_pressure, 200.0).
symptom(p223, cholesterol, 288.0).
symptom(p223, exercise_induced_angina, 1.0).
symptom(p223, st_depression, 4.0).
symptom(p223, st_slope, 0.0).
symptom(p223, num_major_vessels, 2.0).
symptom(p223, thalassemia, 3.0).

symptom(p224, age, 54.0).
symptom(p224, chest_pain_type, 0.0).
symptom(p224, resting_blood_pressure, 110.0).
symptom(p224, cholesterol, 239.0).
symptom(p224, exercise_induced_angina, 1.0).
symptom(p224, st_depression, 2.8).
symptom(p224, st_slope, 1.0).
symptom(p224, num_major_vessels, 1.0).
symptom(p224, thalassemia, 3.0).

symptom(p225, age, 70.0).
symptom(p225, chest_pain_type, 0.0).
symptom(p225, resting_blood_pressure, 145.0).
symptom(p225, cholesterol, 174.0).
symptom(p225, exercise_induced_angina, 1.0).
symptom(p225, st_depression, 2.6).
symptom(p225, st_slope, 0.0).
symptom(p225, num_major_vessels, 0.0).
symptom(p225, thalassemia, 3.0).

symptom(p226, age, 62.0).
symptom(p226, chest_pain_type, 1.0).
symptom(p226, resting_blood_pressure, 120.0).
symptom(p226, cholesterol, 281.0).
symptom(p226, exercise_induced_angina, 0.0).
symptom(p226, st_depression, 1.4).
symptom(p226, st_slope, 1.0).
symptom(p226, num_major_vessels, 1.0).
symptom(p226, thalassemia, 3.0).

symptom(p227, age, 35.0).
symptom(p227, chest_pain_type, 0.0).
symptom(p227, resting_blood_pressure, 120.0).
symptom(p227, cholesterol, 198.0).
symptom(p227, exercise_induced_angina, 1.0).
symptom(p227, st_depression, 1.6).
symptom(p227, st_slope, 1.0).
symptom(p227, num_major_vessels, 0.0).
symptom(p227, thalassemia, 3.0).

symptom(p228, age, 59.0).
symptom(p228, chest_pain_type, 3.0).
symptom(p228, resting_blood_pressure, 170.0).
symptom(p228, cholesterol, 288.0).
symptom(p228, exercise_induced_angina, 0.0).
symptom(p228, st_depression, 0.2).
symptom(p228, st_slope, 1.0).
symptom(p228, num_major_vessels, 0.0).
symptom(p228, thalassemia, 3.0).

symptom(p229, age, 64.0).
symptom(p229, chest_pain_type, 2.0).
symptom(p229, resting_blood_pressure, 125.0).
symptom(p229, cholesterol, 309.0).
symptom(p229, exercise_induced_angina, 1.0).
symptom(p229, st_depression, 1.8).
symptom(p229, st_slope, 1.0).
symptom(p229, num_major_vessels, 0.0).
symptom(p229, thalassemia, 3.0).

symptom(p230, age, 47.0).
symptom(p230, chest_pain_type, 2.0).
symptom(p230, resting_blood_pressure, 108.0).
symptom(p230, cholesterol, 243.0).
symptom(p230, exercise_induced_angina, 0.0).
symptom(p230, st_depression, 0.0).
symptom(p230, st_slope, 2.0).
symptom(p230, num_major_vessels, 0.0).
symptom(p230, thalassemia, 2.0).

symptom(p231, age, 57.0).
symptom(p231, chest_pain_type, 0.0).
symptom(p231, resting_blood_pressure, 165.0).
symptom(p231, cholesterol, 289.0).
symptom(p231, exercise_induced_angina, 0.0).
symptom(p231, st_depression, 1.0).
symptom(p231, st_slope, 1.0).
symptom(p231, num_major_vessels, 3.0).
symptom(p231, thalassemia, 3.0).

symptom(p232, age, 55.0).
symptom(p232, chest_pain_type, 0.0).
symptom(p232, resting_blood_pressure, 160.0).
symptom(p232, cholesterol, 289.0).
symptom(p232, exercise_induced_angina, 1.0).
symptom(p232, st_depression, 0.8).
symptom(p232, st_slope, 1.0).
symptom(p232, num_major_vessels, 1.0).
symptom(p232, thalassemia, 3.0).

symptom(p233, age, 64.0).
symptom(p233, chest_pain_type, 0.0).
symptom(p233, resting_blood_pressure, 120.0).
symptom(p233, cholesterol, 246.0).
symptom(p233, exercise_induced_angina, 1.0).
symptom(p233, st_depression, 2.2).
symptom(p233, st_slope, 0.0).
symptom(p233, num_major_vessels, 1.0).
symptom(p233, thalassemia, 2.0).

symptom(p234, age, 70.0).
symptom(p234, chest_pain_type, 0.0).
symptom(p234, resting_blood_pressure, 130.0).
symptom(p234, cholesterol, 322.0).
symptom(p234, exercise_induced_angina, 0.0).
symptom(p234, st_depression, 2.4).
symptom(p234, st_slope, 1.0).
symptom(p234, num_major_vessels, 3.0).
symptom(p234, thalassemia, 2.0).

symptom(p235, age, 51.0).
symptom(p235, chest_pain_type, 0.0).
symptom(p235, resting_blood_pressure, 140.0).
symptom(p235, cholesterol, 299.0).
symptom(p235, exercise_induced_angina, 1.0).
symptom(p235, st_depression, 1.6).
symptom(p235, st_slope, 2.0).
symptom(p235, num_major_vessels, 0.0).
symptom(p235, thalassemia, 3.0).

symptom(p236, age, 58.0).
symptom(p236, chest_pain_type, 0.0).
symptom(p236, resting_blood_pressure, 125.0).
symptom(p236, cholesterol, 300.0).
symptom(p236, exercise_induced_angina, 0.0).
symptom(p236, st_depression, 0.0).
symptom(p236, st_slope, 2.0).
symptom(p236, num_major_vessels, 2.0).
symptom(p236, thalassemia, 3.0).

symptom(p237, age, 60.0).
symptom(p237, chest_pain_type, 0.0).
symptom(p237, resting_blood_pressure, 140.0).
symptom(p237, cholesterol, 293.0).
symptom(p237, exercise_induced_angina, 0.0).
symptom(p237, st_depression, 1.2).
symptom(p237, st_slope, 1.0).
symptom(p237, num_major_vessels, 2.0).
symptom(p237, thalassemia, 3.0).

symptom(p238, age, 77.0).
symptom(p238, chest_pain_type, 0.0).
symptom(p238, resting_blood_pressure, 125.0).
symptom(p238, cholesterol, 304.0).
symptom(p238, exercise_induced_angina, 1.0).
symptom(p238, st_depression, 0.0).
symptom(p238, st_slope, 2.0).
symptom(p238, num_major_vessels, 3.0).
symptom(p238, thalassemia, 2.0).

symptom(p239, age, 35.0).
symptom(p239, chest_pain_type, 0.0).
symptom(p239, resting_blood_pressure, 126.0).
symptom(p239, cholesterol, 282.0).
symptom(p239, exercise_induced_angina, 1.0).
symptom(p239, st_depression, 0.0).
symptom(p239, st_slope, 2.0).
symptom(p239, num_major_vessels, 0.0).
symptom(p239, thalassemia, 3.0).

symptom(p240, age, 70.0).
symptom(p240, chest_pain_type, 2.0).
symptom(p240, resting_blood_pressure, 160.0).
symptom(p240, cholesterol, 269.0).
symptom(p240, exercise_induced_angina, 1.0).
symptom(p240, st_depression, 2.9).
symptom(p240, st_slope, 1.0).
symptom(p240, num_major_vessels, 1.0).
symptom(p240, thalassemia, 3.0).

symptom(p241, age, 59.0).
symptom(p241, chest_pain_type, 0.0).
symptom(p241, resting_blood_pressure, 174.0).
symptom(p241, cholesterol, 249.0).
symptom(p241, exercise_induced_angina, 1.0).
symptom(p241, st_depression, 0.0).
symptom(p241, st_slope, 1.0).
symptom(p241, num_major_vessels, 0.0).
symptom(p241, thalassemia, 2.0).

symptom(p242, age, 64.0).
symptom(p242, chest_pain_type, 0.0).
symptom(p242, resting_blood_pressure, 145.0).
symptom(p242, cholesterol, 212.0).
symptom(p242, exercise_induced_angina, 0.0).
symptom(p242, st_depression, 2.0).
symptom(p242, st_slope, 1.0).
symptom(p242, num_major_vessels, 2.0).
symptom(p242, thalassemia, 1.0).

symptom(p243, age, 57.0).
symptom(p243, chest_pain_type, 0.0).
symptom(p243, resting_blood_pressure, 152.0).
symptom(p243, cholesterol, 274.0).
symptom(p243, exercise_induced_angina, 1.0).
symptom(p243, st_depression, 1.2).
symptom(p243, st_slope, 1.0).
symptom(p243, num_major_vessels, 1.0).
symptom(p243, thalassemia, 3.0).

symptom(p244, age, 56.0).
symptom(p244, chest_pain_type, 0.0).
symptom(p244, resting_blood_pressure, 132.0).
symptom(p244, cholesterol, 184.0).
symptom(p244, exercise_induced_angina, 1.0).
symptom(p244, st_depression, 2.1).
symptom(p244, st_slope, 1.0).
symptom(p244, num_major_vessels, 1.0).
symptom(p244, thalassemia, 1.0).

symptom(p245, age, 48.0).
symptom(p245, chest_pain_type, 0.0).
symptom(p245, resting_blood_pressure, 124.0).
symptom(p245, cholesterol, 274.0).
symptom(p245, exercise_induced_angina, 0.0).
symptom(p245, st_depression, 0.5).
symptom(p245, st_slope, 1.0).
symptom(p245, num_major_vessels, 0.0).
symptom(p245, thalassemia, 3.0).

symptom(p246, age, 56.0).
symptom(p246, chest_pain_type, 0.0).
symptom(p246, resting_blood_pressure, 134.0).
symptom(p246, cholesterol, 409.0).
symptom(p246, exercise_induced_angina, 1.0).
symptom(p246, st_depression, 1.9).
symptom(p246, st_slope, 1.0).
symptom(p246, num_major_vessels, 2.0).
symptom(p246, thalassemia, 3.0).

symptom(p247, age, 66.0).
symptom(p247, chest_pain_type, 1.0).
symptom(p247, resting_blood_pressure, 160.0).
symptom(p247, cholesterol, 246.0).
symptom(p247, exercise_induced_angina, 1.0).
symptom(p247, st_depression, 0.0).
symptom(p247, st_slope, 1.0).
symptom(p247, num_major_vessels, 3.0).
symptom(p247, thalassemia, 1.0).

symptom(p248, age, 54.0).
symptom(p248, chest_pain_type, 1.0).
symptom(p248, resting_blood_pressure, 192.0).
symptom(p248, cholesterol, 283.0).
symptom(p248, exercise_induced_angina, 0.0).
symptom(p248, st_depression, 0.0).
symptom(p248, st_slope, 2.0).
symptom(p248, num_major_vessels, 1.0).
symptom(p248, thalassemia, 3.0).

symptom(p249, age, 69.0).
symptom(p249, chest_pain_type, 2.0).
symptom(p249, resting_blood_pressure, 140.0).
symptom(p249, cholesterol, 254.0).
symptom(p249, exercise_induced_angina, 0.0).
symptom(p249, st_depression, 2.0).
symptom(p249, st_slope, 1.0).
symptom(p249, num_major_vessels, 3.0).
symptom(p249, thalassemia, 3.0).

symptom(p250, age, 51.0).
symptom(p250, chest_pain_type, 0.0).
symptom(p250, resting_blood_pressure, 140.0).
symptom(p250, cholesterol, 298.0).
symptom(p250, exercise_induced_angina, 1.0).
symptom(p250, st_depression, 4.2).
symptom(p250, st_slope, 1.0).
symptom(p250, num_major_vessels, 3.0).
symptom(p250, thalassemia, 3.0).

symptom(p251, age, 43.0).
symptom(p251, chest_pain_type, 0.0).
symptom(p251, resting_blood_pressure, 132.0).
symptom(p251, cholesterol, 247.0).
symptom(p251, exercise_induced_angina, 1.0).
symptom(p251, st_depression, 0.1).
symptom(p251, st_slope, 1.0).
symptom(p251, num_major_vessels, 4.0).
symptom(p251, thalassemia, 3.0).

symptom(p252, age, 62.0).
symptom(p252, chest_pain_type, 0.0).
symptom(p252, resting_blood_pressure, 138.0).
symptom(p252, cholesterol, 294.0).
symptom(p252, exercise_induced_angina, 0.0).
symptom(p252, st_depression, 1.9).
symptom(p252, st_slope, 1.0).
symptom(p252, num_major_vessels, 3.0).
symptom(p252, thalassemia, 2.0).

symptom(p253, age, 67.0).
symptom(p253, chest_pain_type, 0.0).
symptom(p253, resting_blood_pressure, 100.0).
symptom(p253, cholesterol, 299.0).
symptom(p253, exercise_induced_angina, 1.0).
symptom(p253, st_depression, 0.9).
symptom(p253, st_slope, 1.0).
symptom(p253, num_major_vessels, 2.0).
symptom(p253, thalassemia, 2.0).

symptom(p254, age, 59.0).
symptom(p254, chest_pain_type, 3.0).
symptom(p254, resting_blood_pressure, 160.0).
symptom(p254, cholesterol, 273.0).
symptom(p254, exercise_induced_angina, 0.0).
symptom(p254, st_depression, 0.0).
symptom(p254, st_slope, 2.0).
symptom(p254, num_major_vessels, 0.0).
symptom(p254, thalassemia, 2.0).

symptom(p255, age, 45.0).
symptom(p255, chest_pain_type, 0.0).
symptom(p255, resting_blood_pressure, 142.0).
symptom(p255, cholesterol, 309.0).
symptom(p255, exercise_induced_angina, 1.0).
symptom(p255, st_depression, 0.0).
symptom(p255, st_slope, 1.0).
symptom(p255, num_major_vessels, 3.0).
symptom(p255, thalassemia, 3.0).

symptom(p256, age, 58.0).
symptom(p256, chest_pain_type, 0.0).
symptom(p256, resting_blood_pressure, 128.0).
symptom(p256, cholesterol, 259.0).
symptom(p256, exercise_induced_angina, 1.0).
symptom(p256, st_depression, 3.0).
symptom(p256, st_slope, 1.0).
symptom(p256, num_major_vessels, 2.0).
symptom(p256, thalassemia, 3.0).

symptom(p257, age, 50.0).
symptom(p257, chest_pain_type, 0.0).
symptom(p257, resting_blood_pressure, 144.0).
symptom(p257, cholesterol, 200.0).
symptom(p257, exercise_induced_angina, 1.0).
symptom(p257, st_depression, 0.9).
symptom(p257, st_slope, 1.0).
symptom(p257, num_major_vessels, 0.0).
symptom(p257, thalassemia, 3.0).

symptom(p258, age, 62.0).
symptom(p258, chest_pain_type, 0.0).
symptom(p258, resting_blood_pressure, 150.0).
symptom(p258, cholesterol, 244.0).
symptom(p258, exercise_induced_angina, 1.0).
symptom(p258, st_depression, 1.4).
symptom(p258, st_slope, 1.0).
symptom(p258, num_major_vessels, 0.0).
symptom(p258, thalassemia, 2.0).

symptom(p259, age, 38.0).
symptom(p259, chest_pain_type, 3.0).
symptom(p259, resting_blood_pressure, 120.0).
symptom(p259, cholesterol, 231.0).
symptom(p259, exercise_induced_angina, 1.0).
symptom(p259, st_depression, 3.8).
symptom(p259, st_slope, 1.0).
symptom(p259, num_major_vessels, 0.0).
symptom(p259, thalassemia, 3.0).

symptom(p260, age, 66.0).
symptom(p260, chest_pain_type, 0.0).
symptom(p260, resting_blood_pressure, 178.0).
symptom(p260, cholesterol, 228.0).
symptom(p260, exercise_induced_angina, 1.0).
symptom(p260, st_depression, 1.0).
symptom(p260, st_slope, 1.0).
symptom(p260, num_major_vessels, 2.0).
symptom(p260, thalassemia, 3.0).

symptom(p261, age, 52.0).
symptom(p261, chest_pain_type, 0.0).
symptom(p261, resting_blood_pressure, 112.0).
symptom(p261, cholesterol, 230.0).
symptom(p261, exercise_induced_angina, 0.0).
symptom(p261, st_depression, 0.0).
symptom(p261, st_slope, 2.0).
symptom(p261, num_major_vessels, 1.0).
symptom(p261, thalassemia, 2.0).

symptom(p262, age, 53.0).
symptom(p262, chest_pain_type, 0.0).
symptom(p262, resting_blood_pressure, 123.0).
symptom(p262, cholesterol, 282.0).
symptom(p262, exercise_induced_angina, 1.0).
symptom(p262, st_depression, 2.0).
symptom(p262, st_slope, 1.0).
symptom(p262, num_major_vessels, 2.0).
symptom(p262, thalassemia, 3.0).

symptom(p263, age, 63.0).
symptom(p263, chest_pain_type, 0.0).
symptom(p263, resting_blood_pressure, 108.0).
symptom(p263, cholesterol, 269.0).
symptom(p263, exercise_induced_angina, 1.0).
symptom(p263, st_depression, 1.8).
symptom(p263, st_slope, 1.0).
symptom(p263, num_major_vessels, 2.0).
symptom(p263, thalassemia, 2.0).

symptom(p264, age, 54.0).
symptom(p264, chest_pain_type, 0.0).
symptom(p264, resting_blood_pressure, 110.0).
symptom(p264, cholesterol, 206.0).
symptom(p264, exercise_induced_angina, 1.0).
symptom(p264, st_depression, 0.0).
symptom(p264, st_slope, 1.0).
symptom(p264, num_major_vessels, 1.0).
symptom(p264, thalassemia, 2.0).

symptom(p265, age, 66.0).
symptom(p265, chest_pain_type, 0.0).
symptom(p265, resting_blood_pressure, 112.0).
symptom(p265, cholesterol, 212.0).
symptom(p265, exercise_induced_angina, 1.0).
symptom(p265, st_depression, 0.1).
symptom(p265, st_slope, 2.0).
symptom(p265, num_major_vessels, 1.0).
symptom(p265, thalassemia, 2.0).

symptom(p266, age, 55.0).
symptom(p266, chest_pain_type, 0.0).
symptom(p266, resting_blood_pressure, 180.0).
symptom(p266, cholesterol, 327.0).
symptom(p266, exercise_induced_angina, 1.0).
symptom(p266, st_depression, 3.4).
symptom(p266, st_slope, 1.0).
symptom(p266, num_major_vessels, 0.0).
symptom(p266, thalassemia, 2.0).

symptom(p267, age, 49.0).
symptom(p267, chest_pain_type, 2.0).
symptom(p267, resting_blood_pressure, 118.0).
symptom(p267, cholesterol, 149.0).
symptom(p267, exercise_induced_angina, 0.0).
symptom(p267, st_depression, 0.8).
symptom(p267, st_slope, 2.0).
symptom(p267, num_major_vessels, 3.0).
symptom(p267, thalassemia, 2.0).

symptom(p268, age, 54.0).
symptom(p268, chest_pain_type, 0.0).
symptom(p268, resting_blood_pressure, 122.0).
symptom(p268, cholesterol, 286.0).
symptom(p268, exercise_induced_angina, 1.0).
symptom(p268, st_depression, 3.2).
symptom(p268, st_slope, 1.0).
symptom(p268, num_major_vessels, 2.0).
symptom(p268, thalassemia, 2.0).

symptom(p269, age, 56.0).
symptom(p269, chest_pain_type, 0.0).
symptom(p269, resting_blood_pressure, 130.0).
symptom(p269, cholesterol, 283.0).
symptom(p269, exercise_induced_angina, 1.0).
symptom(p269, st_depression, 1.6).
symptom(p269, st_slope, 0.0).
symptom(p269, num_major_vessels, 0.0).
symptom(p269, thalassemia, 3.0).

symptom(p270, age, 46.0).
symptom(p270, chest_pain_type, 0.0).
symptom(p270, resting_blood_pressure, 120.0).
symptom(p270, cholesterol, 249.0).
symptom(p270, exercise_induced_angina, 0.0).
symptom(p270, st_depression, 0.8).
symptom(p270, st_slope, 2.0).
symptom(p270, num_major_vessels, 0.0).
symptom(p270, thalassemia, 3.0).

symptom(p271, age, 61.0).
symptom(p271, chest_pain_type, 3.0).
symptom(p271, resting_blood_pressure, 134.0).
symptom(p271, cholesterol, 234.0).
symptom(p271, exercise_induced_angina, 0.0).
symptom(p271, st_depression, 2.6).
symptom(p271, st_slope, 1.0).
symptom(p271, num_major_vessels, 2.0).
symptom(p271, thalassemia, 2.0).

symptom(p272, age, 67.0).
symptom(p272, chest_pain_type, 0.0).
symptom(p272, resting_blood_pressure, 120.0).
symptom(p272, cholesterol, 237.0).
symptom(p272, exercise_induced_angina, 0.0).
symptom(p272, st_depression, 1.0).
symptom(p272, st_slope, 1.0).
symptom(p272, num_major_vessels, 0.0).
symptom(p272, thalassemia, 2.0).

symptom(p273, age, 58.0).
symptom(p273, chest_pain_type, 0.0).
symptom(p273, resting_blood_pressure, 100.0).
symptom(p273, cholesterol, 234.0).
symptom(p273, exercise_induced_angina, 0.0).
symptom(p273, st_depression, 0.1).
symptom(p273, st_slope, 2.0).
symptom(p273, num_major_vessels, 1.0).
symptom(p273, thalassemia, 3.0).

symptom(p274, age, 47.0).
symptom(p274, chest_pain_type, 0.0).
symptom(p274, resting_blood_pressure, 110.0).
symptom(p274, cholesterol, 275.0).
symptom(p274, exercise_induced_angina, 1.0).
symptom(p274, st_depression, 1.0).
symptom(p274, st_slope, 1.0).
symptom(p274, num_major_vessels, 1.0).
symptom(p274, thalassemia, 2.0).

symptom(p275, age, 52.0).
symptom(p275, chest_pain_type, 0.0).
symptom(p275, resting_blood_pressure, 125.0).
symptom(p275, cholesterol, 212.0).
symptom(p275, exercise_induced_angina, 0.0).
symptom(p275, st_depression, 1.0).
symptom(p275, st_slope, 2.0).
symptom(p275, num_major_vessels, 2.0).
symptom(p275, thalassemia, 3.0).

symptom(p276, age, 58.0).
symptom(p276, chest_pain_type, 0.0).
symptom(p276, resting_blood_pressure, 146.0).
symptom(p276, cholesterol, 218.0).
symptom(p276, exercise_induced_angina, 0.0).
symptom(p276, st_depression, 2.0).
symptom(p276, st_slope, 1.0).
symptom(p276, num_major_vessels, 1.0).
symptom(p276, thalassemia, 3.0).

symptom(p277, age, 57.0).
symptom(p277, chest_pain_type, 1.0).
symptom(p277, resting_blood_pressure, 124.0).
symptom(p277, cholesterol, 261.0).
symptom(p277, exercise_induced_angina, 0.0).
symptom(p277, st_depression, 0.3).
symptom(p277, st_slope, 2.0).
symptom(p277, num_major_vessels, 0.0).
symptom(p277, thalassemia, 3.0).

symptom(p278, age, 58.0).
symptom(p278, chest_pain_type, 1.0).
symptom(p278, resting_blood_pressure, 136.0).
symptom(p278, cholesterol, 319.0).
symptom(p278, exercise_induced_angina, 0.0).
symptom(p278, st_depression, 0.0).
symptom(p278, st_slope, 2.0).
symptom(p278, num_major_vessels, 2.0).
symptom(p278, thalassemia, 2.0).

symptom(p279, age, 61.0).
symptom(p279, chest_pain_type, 0.0).
symptom(p279, resting_blood_pressure, 138.0).
symptom(p279, cholesterol, 166.0).
symptom(p279, exercise_induced_angina, 1.0).
symptom(p279, st_depression, 3.6).
symptom(p279, st_slope, 1.0).
symptom(p279, num_major_vessels, 1.0).
symptom(p279, thalassemia, 2.0).

symptom(p280, age, 42.0).
symptom(p280, chest_pain_type, 0.0).
symptom(p280, resting_blood_pressure, 136.0).
symptom(p280, cholesterol, 315.0).
symptom(p280, exercise_induced_angina, 1.0).
symptom(p280, st_depression, 1.8).
symptom(p280, st_slope, 1.0).
symptom(p280, num_major_vessels, 0.0).
symptom(p280, thalassemia, 1.0).

symptom(p281, age, 52.0).
symptom(p281, chest_pain_type, 0.0).
symptom(p281, resting_blood_pressure, 128.0).
symptom(p281, cholesterol, 204.0).
symptom(p281, exercise_induced_angina, 1.0).
symptom(p281, st_depression, 1.0).
symptom(p281, st_slope, 1.0).
symptom(p281, num_major_vessels, 0.0).
symptom(p281, thalassemia, 0.0).

symptom(p282, age, 59.0).
symptom(p282, chest_pain_type, 2.0).
symptom(p282, resting_blood_pressure, 126.0).
symptom(p282, cholesterol, 218.0).
symptom(p282, exercise_induced_angina, 0.0).
symptom(p282, st_depression, 2.2).
symptom(p282, st_slope, 1.0).
symptom(p282, num_major_vessels, 1.0).
symptom(p282, thalassemia, 1.0).

symptom(p283, age, 40.0).
symptom(p283, chest_pain_type, 0.0).
symptom(p283, resting_blood_pressure, 152.0).
symptom(p283, cholesterol, 223.0).
symptom(p283, exercise_induced_angina, 0.0).
symptom(p283, st_depression, 0.0).
symptom(p283, st_slope, 2.0).
symptom(p283, num_major_vessels, 0.0).
symptom(p283, thalassemia, 3.0).

symptom(p284, age, 61.0).
symptom(p284, chest_pain_type, 0.0).
symptom(p284, resting_blood_pressure, 140.0).
symptom(p284, cholesterol, 207.0).
symptom(p284, exercise_induced_angina, 1.0).
symptom(p284, st_depression, 1.9).
symptom(p284, st_slope, 2.0).
symptom(p284, num_major_vessels, 1.0).
symptom(p284, thalassemia, 3.0).

symptom(p285, age, 46.0).
symptom(p285, chest_pain_type, 0.0).
symptom(p285, resting_blood_pressure, 140.0).
symptom(p285, cholesterol, 311.0).
symptom(p285, exercise_induced_angina, 1.0).
symptom(p285, st_depression, 1.8).
symptom(p285, st_slope, 1.0).
symptom(p285, num_major_vessels, 2.0).
symptom(p285, thalassemia, 3.0).

symptom(p286, age, 59.0).
symptom(p286, chest_pain_type, 3.0).
symptom(p286, resting_blood_pressure, 134.0).
symptom(p286, cholesterol, 204.0).
symptom(p286, exercise_induced_angina, 0.0).
symptom(p286, st_depression, 0.8).
symptom(p286, st_slope, 2.0).
symptom(p286, num_major_vessels, 2.0).
symptom(p286, thalassemia, 2.0).

symptom(p287, age, 57.0).
symptom(p287, chest_pain_type, 1.0).
symptom(p287, resting_blood_pressure, 154.0).
symptom(p287, cholesterol, 232.0).
symptom(p287, exercise_induced_angina, 0.0).
symptom(p287, st_depression, 0.0).
symptom(p287, st_slope, 2.0).
symptom(p287, num_major_vessels, 1.0).
symptom(p287, thalassemia, 2.0).

symptom(p288, age, 57.0).
symptom(p288, chest_pain_type, 0.0).
symptom(p288, resting_blood_pressure, 110.0).
symptom(p288, cholesterol, 335.0).
symptom(p288, exercise_induced_angina, 1.0).
symptom(p288, st_depression, 3.0).
symptom(p288, st_slope, 1.0).
symptom(p288, num_major_vessels, 1.0).
symptom(p288, thalassemia, 3.0).

symptom(p289, age, 55.0).
symptom(p289, chest_pain_type, 0.0).
symptom(p289, resting_blood_pressure, 128.0).
symptom(p289, cholesterol, 205.0).
symptom(p289, exercise_induced_angina, 1.0).
symptom(p289, st_depression, 2.0).
symptom(p289, st_slope, 1.0).
symptom(p289, num_major_vessels, 1.0).
symptom(p289, thalassemia, 3.0).

symptom(p290, age, 61.0).
symptom(p290, chest_pain_type, 0.0).
symptom(p290, resting_blood_pressure, 148.0).
symptom(p290, cholesterol, 203.0).
symptom(p290, exercise_induced_angina, 0.0).
symptom(p290, st_depression, 0.0).
symptom(p290, st_slope, 2.0).
symptom(p290, num_major_vessels, 1.0).
symptom(p290, thalassemia, 3.0).

symptom(p291, age, 58.0).
symptom(p291, chest_pain_type, 0.0).
symptom(p291, resting_blood_pressure, 114.0).
symptom(p291, cholesterol, 318.0).
symptom(p291, exercise_induced_angina, 0.0).
symptom(p291, st_depression, 4.4).
symptom(p291, st_slope, 0.0).
symptom(p291, num_major_vessels, 3.0).
symptom(p291, thalassemia, 1.0).

symptom(p292, age, 58.0).
symptom(p292, chest_pain_type, 0.0).
symptom(p292, resting_blood_pressure, 170.0).
symptom(p292, cholesterol, 225.0).
symptom(p292, exercise_induced_angina, 1.0).
symptom(p292, st_depression, 2.8).
symptom(p292, st_slope, 1.0).
symptom(p292, num_major_vessels, 2.0).
symptom(p292, thalassemia, 1.0).

symptom(p293, age, 67.0).
symptom(p293, chest_pain_type, 2.0).
symptom(p293, resting_blood_pressure, 152.0).
symptom(p293, cholesterol, 212.0).
symptom(p293, exercise_induced_angina, 0.0).
symptom(p293, st_depression, 0.8).
symptom(p293, st_slope, 1.0).
symptom(p293, num_major_vessels, 0.0).
symptom(p293, thalassemia, 3.0).

symptom(p294, age, 44.0).
symptom(p294, chest_pain_type, 0.0).
symptom(p294, resting_blood_pressure, 120.0).
symptom(p294, cholesterol, 169.0).
symptom(p294, exercise_induced_angina, 1.0).
symptom(p294, st_depression, 2.8).
symptom(p294, st_slope, 0.0).
symptom(p294, num_major_vessels, 0.0).
symptom(p294, thalassemia, 1.0).

symptom(p295, age, 63.0).
symptom(p295, chest_pain_type, 0.0).
symptom(p295, resting_blood_pressure, 140.0).
symptom(p295, cholesterol, 187.0).
symptom(p295, exercise_induced_angina, 1.0).
symptom(p295, st_depression, 4.0).
symptom(p295, st_slope, 2.0).
symptom(p295, num_major_vessels, 2.0).
symptom(p295, thalassemia, 3.0).

symptom(p296, age, 63.0).
symptom(p296, chest_pain_type, 0.0).
symptom(p296, resting_blood_pressure, 124.0).
symptom(p296, cholesterol, 197.0).
symptom(p296, exercise_induced_angina, 1.0).
symptom(p296, st_depression, 0.0).
symptom(p296, st_slope, 1.0).
symptom(p296, num_major_vessels, 0.0).
symptom(p296, thalassemia, 2.0).

symptom(p297, age, 59.0).
symptom(p297, chest_pain_type, 0.0).
symptom(p297, resting_blood_pressure, 164.0).
symptom(p297, cholesterol, 176.0).
symptom(p297, exercise_induced_angina, 0.0).
symptom(p297, st_depression, 1.0).
symptom(p297, st_slope, 1.0).
symptom(p297, num_major_vessels, 2.0).
symptom(p297, thalassemia, 1.0).

symptom(p298, age, 57.0).
symptom(p298, chest_pain_type, 0.0).
symptom(p298, resting_blood_pressure, 140.0).
symptom(p298, cholesterol, 241.0).
symptom(p298, exercise_induced_angina, 1.0).
symptom(p298, st_depression, 0.2).
symptom(p298, st_slope, 1.0).
symptom(p298, num_major_vessels, 0.0).
symptom(p298, thalassemia, 3.0).

symptom(p299, age, 45.0).
symptom(p299, chest_pain_type, 3.0).
symptom(p299, resting_blood_pressure, 110.0).
symptom(p299, cholesterol, 264.0).
symptom(p299, exercise_induced_angina, 0.0).
symptom(p299, st_depression, 1.2).
symptom(p299, st_slope, 1.0).
symptom(p299, num_major_vessels, 0.0).
symptom(p299, thalassemia, 3.0).

symptom(p300, age, 68.0).
symptom(p300, chest_pain_type, 0.0).
symptom(p300, resting_blood_pressure, 144.0).
symptom(p300, cholesterol, 193.0).
symptom(p300, exercise_induced_angina, 0.0).
symptom(p300, st_depression, 3.4).
symptom(p300, st_slope, 1.0).
symptom(p300, num_major_vessels, 2.0).
symptom(p300, thalassemia, 3.0).

symptom(p301, age, 57.0).
symptom(p301, chest_pain_type, 0.0).
symptom(p301, resting_blood_pressure, 130.0).
symptom(p301, cholesterol, 131.0).
symptom(p301, exercise_induced_angina, 1.0).
symptom(p301, st_depression, 1.2).
symptom(p301, st_slope, 1.0).
symptom(p301, num_major_vessels, 1.0).
symptom(p301, thalassemia, 3.0).

symptom(p302, age, 57.0).
symptom(p302, chest_pain_type, 1.0).
symptom(p302, resting_blood_pressure, 130.0).
symptom(p302, cholesterol, 236.0).
symptom(p302, exercise_induced_angina, 0.0).
symptom(p302, st_depression, 0.0).
symptom(p302, st_slope, 1.0).
symptom(p302, num_major_vessels, 1.0).
symptom(p302, thalassemia, 2.0).