import * as tf from "@tensorflow/tfjs";

export const getModelData = async () => {
  try {
    const model = await tf.loadLayersModel(
        "https://prototipo-lsch.s3.us-east-2.amazonaws.com/model/model.json"
    );

    console.log(model.input);
    console.log(model.inputs);
    console.log(model.inputLayers);

    // Check if the model has input shape defined, if not, define it manually
    if (!model.inputs || model.inputs.length === 0) {
        const inputShape = [346, 258, 3]; // Define the correct input shape
        const inputLayer = tf.input({ shape: inputShape });
        const newOutput = model.apply(inputLayer) as tf.SymbolicTensor[];
        const newModel = tf.model({ inputs: inputLayer, outputs: newOutput });
        return newModel;
    }

    return model;
  } catch (error) {
    console.error("Error loading model: ", error);
    throw error;
  }
};
