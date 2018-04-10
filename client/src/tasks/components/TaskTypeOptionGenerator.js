/**
 * Created by Xingyu on 3/24/2018.
 */
import React from 'react';
import TextField from 'material-ui/TextField';
import Slider from 'material-ui/Slider';


function taskNameConverter(taskName){
    let optionComponent = [];

    switch(taskName){
        case "seeding":
            optionComponent =
                [
                    <TextField
                        hintText="Spacing Width"
                        floatingLabelText="Spacing Width"
                    />,
                    <TextField
                        hintText="Spacing Length"
                        floatingLabelText="Spacing Length"
                    />,
                    <TextField
                        hintText="Spacing Depth"
                        floatingLabelText="Spacing Depth"
                    />,
                    <TextField
                        hintText="Spacing Units"
                        floatingLabelText="Spacing Units"
                    />,


                ];
            break;

        case "irrigation":
            optionComponent = [
                <TextField
                    hintText="Flow Rate"
                    floatingLabelText="Flow Rate"
                />,

            ];
            break;

        case "pest-control":
            optionComponent = <div> </div>;
            break;

        case "transplanting":
            optionComponent = [
                <TextField
                    hintText="Spacing Width"
                    floatingLabelText="Spacing Width"
                />,
                <TextField
                    hintText="Spacing Length"
                    floatingLabelText="Spacing Length"
                />,
                <TextField
                    hintText="Spacing Depth"
                    floatingLabelText="Spacing Depth"
                />,
                <TextField
                    hintText="Spacing Units"
                    floatingLabelText="Spacing Units"
                />,

            ];
            break;

        case "soil sampling":
            optionComponent =
                <div>
                    <div> Soil Depth </div>
                    <Slider min = {0}
                            defaultValue={5}
                            max = {100}
                    />
                </div>;
            break;

        case "scouting harvest":
            optionComponent = <div> </div>;
            break;

        case "scouting pests":
            optionComponent = [
                <TextField
                    hintText="Type"
                    floatingLabelText="Type"
                />,
                <TextField
                    hintText="Common name"
                    floatingLabelText="Common name"
                />,
                <TextField
                    hintText="(if applicable) "
                    floatingLabelText="Affected area (Roots, Stem, Leaves)"
                />,
                <TextField
                    hintText="Affected area (%)"
                    floatingLabelText="Affected area (%)"
                />,
                <TextField
                    hintText="Plants affected  (%)"
                    floatingLabelText="Plants affected  (%)"
                />,
            ];
            break;

        case "fertilizing":
            optionComponent = <div> fertilizer, equipment </div>;
            break;

        case "bed preparation":
            optionComponent = <div> equipment </div>;
            break;

        case "packing":
            optionComponent = <div> </div>;
            break;

        case "washing":
            optionComponent = <div> </div>;
            break;

        case "washing and packing":
            optionComponent = <div> </div>;
            break;

        case "social event":
            optionComponent = <div> </div>;
            break;

        case "other":
            optionComponent = <div> </div>;
            break;
    }

    return optionComponent;
}

export default function taskOptionGenerator(taskName){
    return taskNameConverter(taskName);
};