import sys
import tensorflow as tf
import json

# Cargar el modelo
model = tf.keras.models.load_model('https://prototipo-lsch.s3.us-east-2.amazonaws.com/model/model.json')

# Obtener el input del argumento del script
input_data = json.loads(sys.argv[1])

# Realizar la predicción
prediction = model.predict([input_data])

# Imprimir la predicción para capturarla en Node.js
print(json.dumps(prediction.tolist()))
