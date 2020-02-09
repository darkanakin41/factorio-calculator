import defaultTableConfiguration from "../../../_Darkanakin41/Configuration/_defaultTable";

let base = {
    headers: [
        {
            text: "Nom",
            value: "name"
        },
        {
            text: "Type",
            value: "type"
        },
        {
            text: "Utilité",
            value: "utility"
        },
        {
            text: "Objet/Craft",
            value: "output"
        },
        {
            text: "Temps de Craft",
            value: "craftingTime"
        },
        {
            text: "Nombre de composants",
            value: "components"
        },
        {
            text: "Détail",
            value: "detail",
            sortable: false,
        },
    ],

    pagination: {
        ...defaultTableConfiguration.pagination, ...{
            sortBy: ["name"],
            sortDesc: [false],
        }
    },
};

let tableConfig = {...defaultTableConfiguration, ...base};
export default tableConfig;

