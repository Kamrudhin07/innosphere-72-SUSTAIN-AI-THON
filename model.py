import numpy as np
import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score

# Load Dataset (Replace 'data.csv' with your dataset file)
data = pd.read_csv('Crop_recommendation (1).csv')  # Ensure 'data.csv' has columns: N, P, K, temperature, humidity, ph, rainfall, label

# Handle Missing Values
imputer = SimpleImputer(strategy='mean')
data[['N', 'P', 'K', 'temperature', 'humidity', 'ph', 'rainfall']] = imputer.fit_transform(
    data[['N', 'P', 'K', 'temperature', 'humidity', 'ph', 'rainfall']]
)

# Function to Cap Outliers
def cap_outliers(df, column):
    Q1 = df[column].quantile(0.25)
    Q3 = df[column].quantile(0.75)
    IQR = Q3 - Q1
    lower_bound = Q1 - 1.5 * IQR
    upper_bound = Q3 + 1.5 * IQR
    df[column] = np.where(df[column] < lower_bound, lower_bound, df[column])
    df[column] = np.where(df[column] > upper_bound, upper_bound, df[column])

# Apply Outlier Capping
for col in ['N', 'P', 'K', 'temperature', 'humidity', 'ph', 'rainfall']:
    cap_outliers(data, col)

# Encode Labels
label_encoder = LabelEncoder()
data['crop'] = label_encoder.fit_transform(data['label'])

# Feature Scaling
scaler = StandardScaler()
scaled_features = scaler.fit_transform(data[['N', 'P', 'K', 'temperature', 'humidity', 'ph', 'rainfall']])

# Splitting Data
X = pd.DataFrame(scaled_features, columns=['N', 'P', 'K', 'temperature', 'humidity', 'ph', 'rainfall'])
y = data['crop']
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train the Random Forest Model
model = RandomForestClassifier(random_state=42)
model.fit(X_train, y_train)

# Evaluate the Model
y_pred = model.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)
print(f"Model Accuracy: {accuracy:.2f}")

# Prediction Function
def predict_crop(N, P, K, temperature, humidity, ph, rainfall):
    """
    Predict the crop based on user input.
    """
    input_data = np.array([[N, P, K, temperature, humidity, ph, rainfall]])
    scaled_input = scaler.transform(input_data)  # Scale input features
    prediction = model.predict(scaled_input)  # Predict crop
    return label_encoder.inverse_transform(prediction)  # Decode to original label

# User Input
print("Enter the input values for the crop prediction:")
N = float(input("N (Nitrogen content): "))
P = float(input("P (Phosphorus content): "))
K = float(input("K (Potassium content): "))
temperature = float(input("Temperature (°C): "))
humidity = float(input("Humidity (%): "))
ph = float(input("pH: "))
rainfall = float(input("Rainfall (mm): "))

# Predict Crop
result = predict_crop(N, P, K, temperature, humidity, ph, rainfall)
print(f"Predicted Crop Type: {result[0]}")
