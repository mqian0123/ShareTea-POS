import matplotlib.pyplot as plt
import matplotlib.dates as mdates
from datetime import datetime
import numpy as np

# Ideal story point dates (full sprint plan)
ideal_dates = [
    datetime(2025, 3, 23),
    datetime(2025, 3, 27),
    datetime(2025, 3, 31),
    datetime(2025, 4, 4),
    datetime(2025, 4, 7),
    datetime(2025, 4, 8),   # Start of Sprint 2 (backlog adjusted)
    datetime(2025, 4, 11),  # Mid Sprint 2
    datetime(2025, 4, 15),
    datetime(2025, 4, 16),
    datetime(2025, 4, 18),
    datetime(2025, 4, 23)
]

# Ideal linear burndown from 70 → 0
ideal_story_points = np.linspace(70, 0, len(ideal_dates))

# Actual progress including Sprint 2 with a +20 point backlog increase
actual_dates = [
    datetime(2025, 3, 23),
    datetime(2025, 3, 27),
    datetime(2025, 3, 31),
    datetime(2025, 4, 8),
    datetime(2025, 4, 11),
    datetime(2025, 4, 15),
]

actual_story_points = [70, 57, 42, 65, 50, 27]

# Cumulative hours worked (manually approximated)
hours_dates = [
    datetime(2025, 3, 27),
    datetime(2025, 3, 31),
    datetime(2025, 4, 8),
    datetime(2025, 4, 11),
    datetime(2025, 4, 15)
]

hours_cumulative = [8, 18, 21, 32, 46]

# Plot setup
fig, ax1 = plt.subplots(figsize=(10, 6))

# Plot ideal story point burn
ax1.plot(ideal_dates, ideal_story_points, 'o--', color='blue', label='Ideal (Story Points)')

# Plot actual story point burn
ax1.plot(actual_dates, actual_story_points, 'o-', color='red', label='Actual (Story Points)')
ax1.set_xlabel('Date')
ax1.set_ylabel('Story Points Remaining')
ax1.set_title('Project Burndown Chart')
ax1.xaxis.set_major_formatter(mdates.DateFormatter('%b %d'))
ax1.tick_params(axis='x', rotation=45)

# Secondary Y-axis for hours worked
ax2 = ax1.twinx()
ax2.bar(hours_dates, hours_cumulative, width=2, color='green', alpha=0.3, label='Hours Worked')
ax2.set_ylabel('Cumulative Hours Spent')

# Combine legends
lines1, labels1 = ax1.get_legend_handles_labels()
lines2, labels2 = ax2.get_legend_handles_labels()
ax1.legend(lines1 + lines2, labels1 + labels2, loc='upper right')

plt.tight_layout()
plt.show()
