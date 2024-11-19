# backend/model/model_training.py

import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report
import joblib

# Load the dataset
data = pd.read_csv('heart.csv')  # Adjust the path if necessary

# Separate features and target
X = data.drop('target', axis=1)
y = data['target']

# Handle missing values (if any)
X = X.fillna(X.mean())

# Encode categorical variables (if any)
# For simplicity, assuming all features are numerical
# If 'thal' and 'cp' are categorical, encode them
categorical_features = ['cp', 'thal', 'slope', 'restecg']

X = pd.get_dummies(X, columns=categorical_features)

# Split the data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Create the model
model = RandomForestClassifier(n_estimators=100, random_state=42)

# Train the model
model.fit(X_train, y_train)

# Evaluate the model
predictions = model.predict(X_test)
print(classification_report(y_test, predictions))

# Save the model and columns
joblib.dump(model, 'heart_disease_model.pkl')
joblib.dump(X.columns, 'model_columns.pkl')
