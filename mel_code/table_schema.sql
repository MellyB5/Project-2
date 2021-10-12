CREATE TABLE "repiratory_disease" (
    "Week" DATE   NOT NULL,
    "17_18_n" INT   NOT NULL,
    "17_18_ASR" DECIMAL   NOT NULL,
    "18_19_n" INT   NOT NULL,
    "18_19_ASR" DECIMAL   NOT NULL,
    "19_20_n" INT   NOT NULL,
    "19-20_ASR" DECIMAL   NOT NULL,
    CONSTRAINT "pk_repiratory_disease" PRIMARY KEY (
        "Week"
     )
);

CREATE TABLE "asthma" (
    "Week" DATE   NOT NULL,
    "17_18_n" INT   NOT NULL,
    "17_18_ASR" DECIMAL   NOT NULL,
    "18_19_n" INT   NOT NULL,
    "18_19_ASR" DECIMAL   NOT NULL,
    "19_20_n" INT   NOT NULL,
    "19-20_ASR" DECIMAL   NOT NULL,
    CONSTRAINT "pk_asthma" PRIMARY KEY (
        "Week"
     )
);

CREATE TABLE "cv_disease" (
    "Week" DATE   NOT NULL,
    "17_18_n" INT   NOT NULL,
    "17_18_ASR" DECIMAL   NOT NULL,
    "18_19_n" INT   NOT NULL,
    "18_19_ASR" DECIMAL   NOT NULL,
    "19_20_n" INT   NOT NULL,
    "19-20_ASR" DECIMAL   NOT NULL,
    CONSTRAINT "pk_cv_disease" PRIMARY KEY (
        "Week"
     )
);

CREATE TABLE "acute_mi" (
    "Week" DATE   NOT NULL,
    "17_18_n" INT   NOT NULL,
    "17_18_ASR" DECIMAL   NOT NULL,
    "18_19_n" INT   NOT NULL,
    "18_19_ASR" DECIMAL   NOT NULL,
    "19_20_n" INT   NOT NULL,
    "19-20_ASR" DECIMAL   NOT NULL,
    CONSTRAINT "pk_acute_mi" PRIMARY KEY (
        "Week"
     )
);

CREATE TABLE "cerebro_v_disease" (
    "Week" DATE   NOT NULL,
    "17_18_n" INT   NOT NULL,
    "17_18_ASR" DECIMAL   NOT NULL,
    "18_19_n" INT   NOT NULL,
    "18_19_ASR" DECIMAL   NOT NULL,
    "19_20_n" INT   NOT NULL,
    "19-20_ASR" DECIMAL   NOT NULL,
    CONSTRAINT "pk_cerebro_v_disease" PRIMARY KEY (
        "Week"
     )
);

CREATE TABLE "mental" (
    "Week" VARCHAR   NOT NULL,
    "17_18_n" INT   NOT NULL,
    "17_18_ASR" DECIMAL   NOT NULL,
    "18_19_n" INT   NOT NULL,
    "18_19_ASR" DECIMAL   NOT NULL,
    "19_20_n" INT   NOT NULL,
    "19-20_ASR" DECIMAL   NOT NULL,
    CONSTRAINT "pk_mental" PRIMARY KEY (
        "Week"
     )
);

CREATE TABLE "chest_pain" (
    "Week" DATE   NOT NULL,
    "17_18_n" INT   NOT NULL,
    "17_18_ASR" DECIMAL   NOT NULL,
    "18_19_n" INT   NOT NULL,
    "18_19_ASR" DECIMAL   NOT NULL,
    "19_20_n" INT   NOT NULL,
    "19-20_ASR" DECIMAL   NOT NULL,
    CONSTRAINT "pk_chest_pain" PRIMARY KEY (
        "Week"
     )
);

CREATE TABLE "breathing_abnormalities" (
    "Week" DATE   NOT NULL,
    "17_18_n" INT   NOT NULL,
    "17_18_ASR" DECIMAL   NOT NULL,
    "18_19_n" INT   NOT NULL,
    "18_19_ASR" DECIMAL   NOT NULL,
    "19_20_n" INT   NOT NULL,
    "19-20_ASR" DECIMAL   NOT NULL,
    CONSTRAINT "pk_breathing_abnormalities" PRIMARY KEY (
        "Week"
     )
);

CREATE TABLE "copd_exacerbation" (
    "Week" DATE   NOT NULL,
    "17_18_n" INT   NOT NULL,
    "17_18_ASR" DECIMAL   NOT NULL,
    "18_19_n" INT   NOT NULL,
    "18_19_ASR" DECIMAL   NOT NULL,
    "19_20_n" INT   NOT NULL,
    "19-20_ASR" DECIMAL   NOT NULL,
    CONSTRAINT "pk_copd_exacerbation" PRIMARY KEY (
        "Week"
     )
);

CREATE TABLE "inhaler_sales" (
    "SA4_code" VARCHAR   NOT NULL,
    "SA4_name" VARCHAR   NOT NULL,
    "Week" DATE   NOT NULL,
    "18_19_n" INT   NOT NULL,
    "19_20_n" INT   NOT NULL,
    CONSTRAINT "pk_inhaler_sales" PRIMARY KEY (
        "SA4_code","Week"
     )
);
