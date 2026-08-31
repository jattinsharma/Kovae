# Engines package — contains the core domain engines.
# The engines are the heart of KOVAE's deterministic logic.
#
# Architecture:
#   Planner Engine  → generates multi-day schedules
#   Today Engine    → resolves current-day actionable state for Home screen
#
# Planner Engine
#       ↓
# Today Engine
#       ↓
# Home Screen
