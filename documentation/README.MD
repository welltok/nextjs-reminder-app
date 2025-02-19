
### Key Directories

- **`app/`**  
  Houses Next.js routes, layouts, and the main providers.  
- **`features/`**  
  Each domain (like `reminders`) has its own slice and saga.  
- **`store/`**  
  The global Redux setup, including `store.ts` and `rootSaga.ts`.  
- **`components/`**  
  Shared UI components.  
- **`models/`**  
  Mongoose models if you’re using MongoDB.  
- **`utils/`**  
  General utility functions (database connectors, etc.).

---
# Testing
This project uses Jest and React Testing Library. The Jest configuration is in jest.config.ts (or .js). Tests typically reside alongside their source files (e.g. reminderSlice.test.ts next to reminderSlice.ts).

---

# Global State

- The entire app is wrapped with <Provider store={store}> in app/providers.tsx.
- Access state   via ```useSelector((state: RootState) => state.reminders.list)```.
- Dispatch actions with ```useDispatch<AppDispatch>()```.

- Sagas: In our sagas files watchers listen for reducer types, call APIs, and dispatch success/failure actions.