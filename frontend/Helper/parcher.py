import os
import json
import pandas as pd

script_dir = os.path.dirname(os.path.abspath(__file__)) if '__file__' in locals() else "."

target_file = None
for filename in os.listdir(script_dir):
    if filename.endswith(".csv") and "timetable" in filename.lower():
        target_file = os.path.join(script_dir, filename)
        break

if not target_file:
    raise FileNotFoundError("Could not find the timetable CSV file in the current directory.")

df = pd.read_csv(target_file)

courses_dict = {}


for idx, row in df.iterrows():
    code = row['Course Number']
    name = row['Course Name']
  
    if pd.isna(code) or pd.isna(name):
        continue
        
    code_str = str(code).strip()
    name_str = str(name).strip()

    if code_str in courses_dict:
        continue
        
    course_entry = {
        "Course Code": code_str,
        "Course Name": name_str
    }
    
    for field in ['Lecture', 'Tutorial', 'Lab']:
        if field in row and pd.notna(row[field]):
            val = str(row[field]).strip()
            if val: 
                course_entry[field] = val
                
    courses_dict[code_str] = course_entry

unique_courses = list(courses_dict.values())

json_data = json.dumps(unique_courses, indent=2, ensure_ascii=False)

output_json_path = os.path.join(script_dir, "courses.json")
output_ts_path = os.path.join(script_dir, "courses.ts")

with open(output_json_path, "w", encoding="utf-8") as json_file:
    json_file.write(json_data)

ts_format = f"const COURSES: CourseEntry[] = {json_data};"
with open(output_ts_path, "w", encoding="utf-8") as ts_file:
    ts_file.write(ts_format)

print(f"Deduplication complete!")
print(f"Original entries filtered down to {len(unique_courses)} unique courses.")