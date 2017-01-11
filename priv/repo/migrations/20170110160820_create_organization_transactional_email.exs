defmodule Pomerol.Repo.Migrations.CreateOrganizationTransactionalEmail do
  use Ecto.Migration

  def change do
    create table(:organization_transactional_emails, primary_key: false) do
      add :id, :binary_id, primary_key: true
      add :type, :string
      add :subject, :text, null: false
      add :body, :text
      add :footer, :text
      add :organization_id, references(:organizations, on_delete: :nothing, type: :binary_id), null: false
      timestamps
    end

    create unique_index(:organization_transactional_emails, [:organization_id, :type])
  end
end
