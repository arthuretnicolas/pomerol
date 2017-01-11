defmodule Pomerol.NotificationEmail do
  use Pomerol.Web, :model
  import Pomerol.ValidationHelpers

  schema "notification_emails" do
    field :email, :string
    field :type, :string

    belongs_to :organization, Pomerol.Organization
    timestamps
  end

  def create_changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:email, :type, :organization_id])
    |> validate_required([:email, :type, :organization_id])
    |> validate_inclusion(:type, Pomerol.SupportedEnums.notification_emails)
    |> unique_constraint(:email, name: :index_notification_emails_on_email_type)
  end

  def update_changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:email])
    |> validate_required([:email])
    |> unique_constraint(:email, name: :index_notification_emails_on_email_type)
  end

end
