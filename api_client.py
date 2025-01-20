from gradio_client import Client # type: ignore

# Create a client to interact with the API
client = Client("https://645feaa001aa01e0d9.gradio.live/")

# Input values for the prediction
result = client.predict(
    N=20,            # Nitrogen level
    P=20,            # Phosphorus level
    K=50,            # Potassium level
    temperature=100,  # Temperature in °C
    humidity=10,     # Humidity in %
    ph=0.9,          # pH level
    rainfall=80,    # Rainfall in mm
    api_name="/predict"
)

# Print the result
print("Prediction:", result)
