/* @flow */
import Axios from "axios";
import { build } from "./utils";
import { composeWithJson } from "graphql-compose-json";
import {schemaComposer, toInputObjectType } from "graphql-compose";

const baseUrl = 'URL_HERE';

export const buildAsyncSchema = async () => {
    const url = `${baseUrl}/200`;
    const jsonData = await Axios.get(url)
    const CaseType = composeWithJson('Case', jsonData.data);
    const CaseTypeInput = toInputObjectType(CaseType);

    // Query Methods
    CaseType.addResolver({
        name: 'findById',
        type: CaseType,
        args: {
            id: 'Int!',
        },
        resolve: async (rp) => {
            let response = await Axios.get(`${baseUrl}/${rp.args.id}`);
            return response.data
        },
    });

    // Mutation Methods
    CaseType.addResolver({
        name: 'updateById',
        type: CaseType,
        args: {
            input: { type: CaseTypeInput }
        },
        resolve: async (rp) => {
            let response = await Axios.get(`${baseUrl}/${rp.args.input.id}`);
            let input = rp.args.input;
            let data = build(response.data, input);
            return data;
        }
    })

    schemaComposer.Query.addFields({
        case: CaseType.getResolver('findById'),
    });

    schemaComposer.Mutation.addFields({
        updateCase: CaseType.getResolver('updateById')
    })

    const schema = schemaComposer.buildSchema();
    //console.log(printSchema(schema))
    return schema;
};
