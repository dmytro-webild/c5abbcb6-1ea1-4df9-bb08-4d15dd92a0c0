type GridConfig = {
    gridCols: string;
    gridRows?: string;
    itemClasses: string[];
    itemHeightClasses?: string[];
    heightClasses?: string;
    itemWrapperClass?: string;
} | null;

type GridVariantConfig = {
    [key: number]: GridConfig;
};

export const gridConfigs: Record<string, GridVariantConfig> = {
    "uniform-all-items-equal": {
        1: null,
        2: null,
        3: { gridCols: "md:grid-cols-3", itemClasses: [], heightClasses: "min-h-90 2xl:min-h-100" },
        4: { gridCols: "md:grid-cols-4", itemClasses: [], heightClasses: "min-h-90 2xl:min-h-100" },
    },
    "bento-grid": {
        1: null,
        2: null,
        3: {
            gridCols: "md:grid-cols-4",
            gridRows: "md:grid-rows-[18rem_18rem] 2xl:grid-rows-[22rem_22rem]",
            itemClasses: [
                "md:col-span-2 md:row-span-2 md:min-h-0 md:overflow-hidden",
                "md:col-span-2 md:row-span-1 md:min-h-0 md:overflow-hidden",
                "md:col-span-2 md:row-span-1 md:min-h-0 md:overflow-hidden",
            ],
            heightClasses: "min-h-80"
        },
        4: {
            gridCols: "md:grid-cols-4",
            gridRows: "md:grid-rows-[18rem_18rem] 2xl:grid-rows-[22rem_22rem]",
            itemClasses: [
                "md:col-span-2 md:row-span-2 md:min-h-0 md:overflow-hidden",
                "md:col-span-2 md:row-span-1 md:min-h-0 md:overflow-hidden",
                "md:col-span-1 md:row-span-1 md:min-h-0 md:overflow-hidden",
                "md:col-span-1 md:row-span-1 md:min-h-0 md:overflow-hidden",
            ],
            heightClasses: "min-h-80"
        },
    },
    "bento-grid-inverted": {
        1: null,
        2: null,
        3: {
            gridCols: "md:grid-cols-4",
            gridRows: "md:grid-rows-[18rem_18rem] 2xl:grid-rows-[22rem_22rem]",
            itemClasses: [
                "md:col-span-2 md:row-span-1 md:min-h-0 md:overflow-hidden",
                "md:col-span-2 md:row-span-2 md:min-h-0 md:overflow-hidden",
                "md:col-span-2 md:row-span-1 md:min-h-0 md:overflow-hidden",
            ],
            heightClasses: "min-h-80"
        },
        4: {
            gridCols: "md:grid-cols-4",
            gridRows: "md:grid-rows-[18rem_18rem] 2xl:grid-rows-[22rem_22rem]",
            itemClasses: [
                "md:col-span-1 md:row-span-1 md:min-h-0 md:overflow-hidden",
                "md:col-span-1 md:row-span-1 md:min-h-0 md:overflow-hidden",
                "md:col-span-2 md:row-span-1 md:min-h-0 md:overflow-hidden",
                "md:col-span-2 md:row-span-2 md:row-start-1 md:col-start-3 md:min-h-0 md:overflow-hidden",
            ],
            heightClasses: "min-h-80"
        },
    },
    "two-columns-alternating-heights": {
        1: null,
        2: null,
        3: { gridCols: "md:grid-cols-3", itemClasses: [] },
        4: {
            gridCols: "md:grid-cols-2",
            gridRows: "md:grid-rows-[13rem_13rem_0.5rem_0.5rem_13rem_13rem] 2xl:grid-rows-[16rem_16rem_0.5rem_0.5rem_16rem_16rem]",
            itemClasses: [
                "md:col-span-1 md:row-span-2 md:row-start-1 md:min-h-0 md:overflow-hidden",
                "md:col-span-1 md:row-span-4 md:row-start-1 md:min-h-0 md:overflow-hidden",
                "md:col-span-1 md:row-span-4 md:row-start-3 md:min-h-0 md:overflow-hidden",
                "md:col-span-1 md:row-span-2 md:row-start-5 md:min-h-0 md:overflow-hidden",
            ]
        },
    },
    "asymmetric-60-wide-40-narrow": {
        1: null,
        2: null,
        3: {
            gridCols: "md:grid-cols-10",
            gridRows: "md:grid-rows-[24rem_24rem] 2xl:grid-rows-[27rem_27rem]",
            itemClasses: [
                "md:col-span-6 md:row-span-1 md:min-h-0 md:overflow-hidden",
                "md:col-span-4 md:row-span-1 md:min-h-0 md:overflow-hidden",
                "md:col-span-10 md:row-span-1 md:min-h-0 md:overflow-hidden",
            ]
        },
        4: {
            gridCols: "md:grid-cols-10",
            gridRows: "md:grid-rows-[24rem_24rem] 2xl:grid-rows-[27rem_27rem]",
            itemClasses: [
                "md:col-span-6 md:row-span-1 md:min-h-0 md:overflow-hidden",
                "md:col-span-4 md:row-span-1 md:min-h-0 md:overflow-hidden",
                "md:col-span-4 md:row-span-1 md:min-h-0 md:overflow-hidden",
                "md:col-span-6 md:row-span-1 md:min-h-0 md:overflow-hidden",
            ]
        },
    },
    "three-columns-all-equal-width": {
        1: null,
        2: null,
        3: {
            gridCols: "md:grid-cols-2",
            gridRows: "md:grid-rows-[21rem_21rem] 2xl:grid-rows-[24rem_24rem]",
            itemClasses: [
                "md:col-span-1 md:row-span-2 md:min-h-0 md:overflow-hidden",
                "md:col-span-1 md:row-span-1 md:min-h-0 md:overflow-hidden",
                "md:col-span-1 md:row-span-1 md:min-h-0 md:overflow-hidden",
            ]
        },
        4: {
            gridCols: "md:grid-cols-3",
            gridRows: "md:grid-rows-[21rem_21rem] 2xl:grid-rows-[24rem_24rem]",
            itemClasses: [
                "md:col-span-1 md:row-span-2 md:min-h-0 md:overflow-hidden",
                "md:col-span-1 md:row-span-2 md:min-h-0 md:overflow-hidden",
                "md:col-span-1 md:row-span-1 md:min-h-0 md:overflow-hidden",
                "md:col-span-1 md:row-span-1 md:min-h-0 md:overflow-hidden",
            ]
        },
    },
    "four-items-2x2-equal-grid": {
        1: null,
        2: null,
        3: { gridCols: "md:grid-cols-3", itemClasses: [] },
        4: {
            gridCols: "md:grid-cols-2",
            gridRows: "md:grid-rows-[26.5rem_26.5rem] 2xl:grid-rows-[32.5rem_32.5rem]",
            itemClasses: [
                "md:col-span-1 md:row-span-1 md:min-h-0 md:overflow-hidden",
                "md:col-span-1 md:row-span-1 md:min-h-0 md:overflow-hidden",
                "md:col-span-1 md:row-span-1 md:min-h-0 md:overflow-hidden",
                "md:col-span-1 md:row-span-1 md:min-h-0 md:overflow-hidden",
            ]
        },
    },
    "one-large-right-three-stacked-left": {
        1: null,
        2: null,
        3: {
            gridCols: "md:grid-cols-6",
            gridRows: "md:grid-rows-[24rem_24rem] 2xl:grid-rows-[27rem_27rem]",
            itemClasses: [
                "md:col-span-2 md:row-span-1 md:row-start-1 md:min-h-0 md:overflow-hidden",
                "md:col-span-2 md:row-span-1 md:row-start-2 md:min-h-0 md:overflow-hidden",
                "md:col-span-4 md:row-span-2 md:row-start-1 md:min-h-0 md:overflow-hidden",
            ]
        },
        4: {
            gridCols: "md:grid-cols-6",
            gridRows: "md:grid-rows-[17.5rem_17.5rem_17.5rem] 2xl:grid-rows-[21rem_21rem_21rem]",
            itemClasses: [
                "md:col-span-2 md:row-span-1 md:row-start-1 md:min-h-0 md:overflow-hidden",
                "md:col-span-2 md:row-span-1 md:row-start-2 md:min-h-0 md:overflow-hidden",
                "md:col-span-2 md:row-span-1 md:row-start-3 md:min-h-0 md:overflow-hidden",
                "md:col-span-4 md:row-span-3 md:row-start-1 md:min-h-0 md:overflow-hidden",
            ]
        },
    },
    "items-top-row-full-width-bottom": {
        1: null,
        2: null,
        3: {
            gridCols: "md:grid-cols-2",
            gridRows: "md:grid-rows-[24rem_24rem] 2xl:grid-rows-[27rem_27rem]",
            itemClasses: [
                "md:col-span-1 md:row-span-1 md:min-h-0 md:overflow-hidden",
                "md:col-span-1 md:row-span-1 md:min-h-0 md:overflow-hidden",
                "md:col-span-2 md:row-span-1 md:min-h-0 md:overflow-hidden",
            ]
        },
        4: {
            gridCols: "md:grid-cols-3",
            gridRows: "md:grid-rows-[24rem_24rem] 2xl:grid-rows-[27rem_27rem]",
            itemClasses: [
                "md:col-span-1 md:row-span-1 md:min-h-0 md:overflow-hidden",
                "md:col-span-1 md:row-span-1 md:min-h-0 md:overflow-hidden",
                "md:col-span-1 md:row-span-1 md:min-h-0 md:overflow-hidden",
                "md:col-span-3 md:row-span-1 md:min-h-0 md:overflow-hidden",
            ]
        },
    },
    "full-width-top-items-bottom-row": {
        1: null,
        2: null,
        3: {
            gridCols: "md:grid-cols-2",
            gridRows: "md:grid-rows-[24rem_24rem] 2xl:grid-rows-[27rem_27rem]",
            itemClasses: [
                "md:col-span-2 md:row-span-1 md:min-h-0 md:overflow-hidden",
                "md:col-span-1 md:row-span-1 md:min-h-0 md:overflow-hidden",
                "md:col-span-1 md:row-span-1 md:min-h-0 md:overflow-hidden",
            ]
        },
        4: {
            gridCols: "md:grid-cols-3",
            gridRows: "md:grid-rows-[24rem_24rem] 2xl:grid-rows-[27rem_27rem]",
            itemClasses: [
                "md:col-span-3 md:row-span-1 md:min-h-0 md:overflow-hidden",
                "md:col-span-1 md:row-span-1 md:min-h-0 md:overflow-hidden",
                "md:col-span-1 md:row-span-1 md:min-h-0 md:overflow-hidden",
                "md:col-span-1 md:row-span-1 md:min-h-0 md:overflow-hidden",
            ]
        },
    },
    "one-large-left-three-stacked-right": {
        1: null,
        2: null,
        3: {
            gridCols: "md:grid-cols-6",
            gridRows: "md:grid-rows-[24rem_24rem] 2xl:grid-rows-[27rem_27rem]",
            itemClasses: [
                "md:col-span-4 md:row-span-2 md:row-start-1 md:min-h-0 md:overflow-hidden",
                "md:col-span-2 md:row-span-1 md:row-start-1 md:min-h-0 md:overflow-hidden",
                "md:col-span-2 md:row-span-1 md:row-start-2 md:min-h-0 md:overflow-hidden",
            ]
        },
        4: {
            gridCols: "md:grid-cols-6",
            gridRows: "md:grid-rows-[17.5rem_17.5rem_17.5rem] 2xl:grid-rows-[21rem_21rem_21rem]",
            itemClasses: [
                "md:col-span-4 md:row-span-3 md:row-start-1 md:min-h-0 md:overflow-hidden",
                "md:col-span-2 md:row-span-1 md:row-start-1 md:min-h-0 md:overflow-hidden",
                "md:col-span-2 md:row-span-1 md:row-start-2 md:min-h-0 md:overflow-hidden",
                "md:col-span-2 md:row-span-1 md:row-start-3 md:min-h-0 md:overflow-hidden",
            ]
        },
    },
    "two-items-per-row": {
        1: null,
        2: {
            gridCols: "md:grid-cols-2",
            gridRows: "md:grid-rows-[28rem] 2xl:grid-rows-[32rem]",
            itemClasses: [
                "md:col-span-1 md:min-h-0 md:overflow-hidden",
                "md:col-span-1 md:min-h-0 md:overflow-hidden",
            ]
        },
        3: {
            gridCols: "md:grid-cols-2",
            gridRows: "md:grid-rows-[28rem_28rem] 2xl:grid-rows-[32rem_32rem]",
            itemClasses: [
                "md:col-span-1 md:min-h-0 md:overflow-hidden",
                "md:col-span-1 md:min-h-0 md:overflow-hidden",
                "md:col-span-2 md:min-h-0 md:overflow-hidden",
            ]
        },
        4: {
            gridCols: "md:grid-cols-2",
            gridRows: "md:grid-rows-[28rem_28rem] 2xl:grid-rows-[32rem_32rem]",
            itemClasses: [
                "md:col-span-1 md:min-h-0 md:overflow-hidden",
                "md:col-span-1 md:min-h-0 md:overflow-hidden",
                "md:col-span-1 md:min-h-0 md:overflow-hidden",
                "md:col-span-1 md:min-h-0 md:overflow-hidden",
            ]
        },
        5: {
            gridCols: "md:grid-cols-2",
            gridRows: "md:grid-rows-[28rem_28rem_28rem] 2xl:grid-rows-[32rem_32rem_32rem]",
            itemClasses: [
                "md:col-span-1 md:min-h-0 md:overflow-hidden",
                "md:col-span-1 md:min-h-0 md:overflow-hidden",
                "md:col-span-1 md:min-h-0 md:overflow-hidden",
                "md:col-span-1 md:min-h-0 md:overflow-hidden",
                "md:col-span-2 md:min-h-0 md:overflow-hidden",
            ]
        },
        6: {
            gridCols: "md:grid-cols-2",
            gridRows: "md:grid-rows-[28rem_28rem_28rem] 2xl:grid-rows-[32rem_32rem_32rem]",
            itemClasses: [
                "md:col-span-1 md:min-h-0 md:overflow-hidden",
                "md:col-span-1 md:min-h-0 md:overflow-hidden",
                "md:col-span-1 md:min-h-0 md:overflow-hidden",
                "md:col-span-1 md:min-h-0 md:overflow-hidden",
                "md:col-span-1 md:min-h-0 md:overflow-hidden",
                "md:col-span-1 md:min-h-0 md:overflow-hidden",
            ]
        },
        7: {
            gridCols: "md:grid-cols-2",
            gridRows: "md:grid-rows-[28rem_28rem_28rem_28rem] 2xl:grid-rows-[32rem_32rem_32rem_32rem]",
            itemClasses: [
                "md:col-span-1 md:min-h-0 md:overflow-hidden",
                "md:col-span-1 md:min-h-0 md:overflow-hidden",
                "md:col-span-1 md:min-h-0 md:overflow-hidden",
                "md:col-span-1 md:min-h-0 md:overflow-hidden",
                "md:col-span-1 md:min-h-0 md:overflow-hidden",
                "md:col-span-1 md:min-h-0 md:overflow-hidden",
                "md:col-span-2 md:min-h-0 md:overflow-hidden",
            ]
        },
        8: {
            gridCols: "md:grid-cols-2",
            gridRows: "md:grid-rows-[28rem_28rem_28rem_28rem] 2xl:grid-rows-[32rem_32rem_32rem_32rem]",
            itemClasses: [
                "md:col-span-1 md:min-h-0 md:overflow-hidden",
                "md:col-span-1 md:min-h-0 md:overflow-hidden",
                "md:col-span-1 md:min-h-0 md:overflow-hidden",
                "md:col-span-1 md:min-h-0 md:overflow-hidden",
                "md:col-span-1 md:min-h-0 md:overflow-hidden",
                "md:col-span-1 md:min-h-0 md:overflow-hidden",
                "md:col-span-1 md:min-h-0 md:overflow-hidden",
                "md:col-span-1 md:min-h-0 md:overflow-hidden",
            ]
        },
    },
};
