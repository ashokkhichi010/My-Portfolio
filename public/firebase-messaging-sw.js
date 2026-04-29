self.addEventListener('push', (event) => {
  const payload = event.data?.json?.() ?? {};
  const title = payload.notification?.title || 'New Lead';
  const options = {
    body: payload.notification?.body || 'A verified visitor requested a human handover.',
    data: payload.data || {},
  };

  event.waitUntil(self.registration.showNotification(title, options));
});
