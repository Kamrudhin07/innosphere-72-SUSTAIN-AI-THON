**OVERVIEW**
**Enhanced Agri-IoT System for Soil Health Monitoring and Crop Recommendation Using Machine Learning (soilsync)**

 This project addresses the challenges faced by farmers in optimizing crop yields due to limited knowledge of soil health, improper crop selection, and inefficient resource management. The system utilizes IoT sensors to monitor key soil parameters such as pH, moisture, temperature, and NPK (Nitrogen, Phosphorus, Potassium) levels in real-time.
Machine Learning algorithms analyze this data to:
* Recommend suitable crops based on soil conditions.
* Optimize irrigation schedules using soil moisture and weather data.
* Suggest efficient fertilizer usage tailored to the soil's nutrient needs.
* A user-friendly dashboard integrates these insights, empowering farmers to make data-driven decisions, enhance productivity, conserve resources, and adopt sustainable farming practices. This solution aligns with UN SDG Goal 2 (Zero Hunger) and Goal 12 (Responsible Consumption and Production).



  **WORKFLOW**
  
  ![image](https://github.com/user-attachments/assets/b5abcd29-5b13-4699-977e-2ca1a20075e2)


  **CONCEPT MAP**

  Concept Map for "Enhanced Agri-IoT System for Soil Health Monitoring and Crop Recommendation Using Machine Learning"

1) IoT Sensors:

Monitors soil parameters:
pH
Moisture
Temperature
NPK (Nitrogen, Phosphorus, Potassium)
Provides real-time data collection.
Real-Time Data Collection

2) Sends data to a central processing unit or cloud.
Enables continuous monitoring of soil health.
Machine Learning Algorithms

3) Crop Recommendation:
Analyzes soil conditions to recommend suitable crops.
Irrigation Scheduling:
Uses soil moisture and weather data to optimize irrigation.
Fertilizer Optimization:
Recommends efficient use of fertilizers based on NPK levels.
User-Friendly Dashboard

4) Displays actionable insights:
Crop recommendations.
Irrigation schedules.
Fertilizer usage suggestions.
Accessible via web or mobile platforms.
Sustainable Farming Practices

5) Conserves water and fertilizer resources.
Reduces environmental impact.
Aligns with:
UN SDG Goal 2: Zero Hunger.
UN SDG Goal 12: Responsible Consumption and Production.


**TECH STACK**

**1. Hardware**
Sensors:
DHT11 (Temperature and Humidity)
Soil Moisture Sensor
Microcontroller:
ESP32 (for data collection and Wi-Fi transmission) 

**2. Cloud**
Database:
Supabase (open-source backend-as-a-service for real-time data storage and retrieval)  

**3. Machine Learning**
Platform:
Python-based framework for ML model (GoogleCollab)
Integration:
Flask to host and connect the ML model via API

**4. Software Development**
Web Application:
Framework: React.js,node.js

**5. Communication Protocols**
IoT Communication:
HTTP (for sending data from ESP32 to Supabase or cloud services)

**6. Tools and IDEs**
Hardware Programming:
Arduino IDE or PlatformIO (for ESP32 programming)
Web Development:
Visual Studio Code 




