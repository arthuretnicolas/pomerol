defmodule Pomerol.Repo.Migrations.CreateNotificationEmail do
  use Ecto.Migration

  def change do
    create table(:notification_emails, primary_key: false) do
      add :id, :binary_id, primary_key: true
      add :email, :string
      add :type, :string, null: false

      add :organization_id, references(:organizations, on_delete: :nothing, type: :binary_id), null: false

      timestamps
    end

    create unique_index(:notification_emails, [:organization_id, :email, :type], name: :index_notification_emails_on_email_type)
  end
end
