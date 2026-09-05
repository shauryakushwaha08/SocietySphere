const STORAGE_KEY = "societysphere_applications";

export function getApplications() {
  const data = localStorage.getItem(STORAGE_KEY);
  if (data != null) {
    return JSON.parse(data);
  }
  else {
    return [];
  }
}

export function saveApplication(application) {
  const applications = getApplications();
  let new_applications = [...applications, application];

  let data = JSON.stringify(new_applications)

  localStorage.setItem(STORAGE_KEY, data);
}