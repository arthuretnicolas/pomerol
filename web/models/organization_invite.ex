defmodule Pomerol.OrganizationInvite do
  use Pomerol.Web, :model
  import Pomerol.ValidationHelpers

  schema "organization_invites" do
    field :email, :string
    field :role, :string
    field :message, :string
    field :token, :string
    field :pending, :boolean, default: true

    belongs_to :organization, Pomerol.Organization
    belongs_to :user, Pomerol.User

    timestamps
  end

  def create_changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:email, :role, :message, :organization_id, :user_id])
    |> validate_required([:email, :role, :organization_id, :user_id])
    |> update_change(:email, &String.downcase/1)
    |> validate_email_format(:email)
    |> assoc_constraint(:user)
    |> assoc_constraint(:organization)
    |> unique_constraint(:token)
    |> unique_constraint(:organization_id_email)
    |> validate_inclusion(:role, roles)
    |> put_change(:token, Pomerol.Random.hex)
  end

  # intended to resend an invitation
  def update_changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [])
    |> put_change(:updated_at, Timex.now )
  end

  defp roles do
    ~w{ viewer author manager admin }
  end

  def preload_all(query, locale) do
    from query, preload: [
      [:organization, {:user, country: [ translation: ^Pomerol.CountryTranslation.translation_query(locale) ]}]
    ]
  end
end
