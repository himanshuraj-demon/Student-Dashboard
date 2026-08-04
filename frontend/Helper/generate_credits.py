import os
import pandas as pd
import json

script_dir = os.path.dirname(os.path.abspath(__file__)) if '__file__' in locals() else "."
csv_path = os.path.join(script_dir, "timetable.csv")

if not os.path.exists(csv_path):
    raise FileNotFoundError("timetable.csv not found")

df = pd.read_csv(csv_path)

credits_map = {}

for idx, row in df.iterrows():
    code = row['Course Number']
    credits = row['C']
    
    if pd.isna(code) or pd.isna(credits):
        continue
        
    code_str = str(code).strip()
    try:
        credits_val = float(credits)
        # convert to int if it's a whole number
        if credits_val.is_integer():
            credits_val = int(credits_val)
    except ValueError:
        # Fallback if credits is not a number
        credits_val = 3
        
    credits_map[code_str] = credits_val

output_ts_path = os.path.join(script_dir, "..", "constants", "coursecredits.ts")

# Write typescript format
with open(output_ts_path, "w", encoding="utf-8") as ts_file:
    ts_file.write("// Generated from timetable.csv using generate_credits.py\n")
    ts_file.write("export const COURSE_CREDITS: Record<string, number> = ")
    ts_file.write(json.dumps(credits_map, indent=2, ensure_ascii=False))
    ts_file.write(";\n")

print(f"Extraction complete! Generated {len(credits_map)} entries in coursecredits.ts.")
