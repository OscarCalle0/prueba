resource "google_pubsub_subscription" "example" {
  ack_deadline_seconds       = "10"
  message_retention_duration = "900s"
  name                       = "subExample"
  project                    = var.project
  expiration_policy {
    ttl = ""
  }

  retry_policy {
    minimum_backoff = "10s"
    maximum_backoff = "30s"
  }

  push_config {
    push_endpoint = data.google_cloud_run_service.example.status[0].url
  }

  retain_acked_messages = "false"
  topic                 = google_pubsub_topic.example.name
}
