import pandas as pd
import seaborn as sns
import matplotlib as plt


df = pd.read_csv("dataset.csv")
print(df.head())

print(df.shape)
print(df.columns)
print(df.info())
print(df.head())

# Clean column names
df.columns = df.columns.str.strip().str.lower().str.replace(' ', '_')

# Drop unnecessary columns
df.drop(columns=['unnamed:_0'], inplace=True, errors='ignore')

# Drop rows with missing values
df.dropna(inplace=True)

# Remove duplicates
df.drop_duplicates(inplace=True)

# Encode categorical data (example, adjust if needed)
if 'gender' in df.columns:
    df['gender'] = df['gender'].map({'Male': 0, 'Female': 1})
if 'depressed' in df.columns:
    df['depressed'] = df['depressed'].map({'Yes': 1, 'No': 0})

# Save
df.to_csv("cleaned_dataset.csv", index=False)
print("Cleaned dataset saved successfully.")